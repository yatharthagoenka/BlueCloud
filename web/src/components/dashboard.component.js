import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import AppService from "../services/app.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ReactPaginate from "react-paginate";
import { withRouter } from "../common/with-router";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleFileInput = this.handleFileInput.bind(this);
    this.uploadFile = this.uploadFile.bind(this);

    this.state = {
      redirect: null,
      userReady: false,
      files: [],
      message: '',
      loading: false,
      selectedFile: null,
      currentUser: '',
      itemsPerPage: 3,
      pageCount: 0,
      itemOffset: 0,
      currentItems: [],
    };
  }

  handleFileInput(event) {
    this.setState({
      selectedFile: event.target.files[0],
    })
  }

  uploadFile(e){
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    const data = new FormData()
    data.append('file', this.state.selectedFile)

    AppService.uploadFile(data, this.state.currentUser.user._id, JSON.parse(localStorage.getItem("user")).token).then(
      response => {
        this.setState({
          message: response.data,
          loading: false,
        });
      },
      error => {
        this.setState({
          message: error.toString()
        });
      }
    );
  }

  componentDidMount(){
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })

    const endOffset = this.state.itemOffset + this.state.itemsPerPage;

    AppService.getUserFiles(currentUser.user._id, JSON.parse(localStorage.getItem("user")).token).then(
      response => {
        this.setState({
          files: response.data.files,
          currentItems: response.data.files.slice(this.state.itemOffset, endOffset),
          pageCount: Math.ceil(response.data.length / this.state.itemsPerPage)
        });
      },
      error => {
        this.setState({
          message: error.toString()
        });
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        <Form
            onSubmit={this.uploadFile}
            ref={c => {
              this.form = c;
            }}
            style={{ width: '50%', margin: 'auto' }}
          >
            <div className="form-group">
              <Input
                type="file"
                className="form-control"
                name="file" 
                onChange={this.handleFileInput}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Upload</span>
              </button>
            </div>
          </Form>
        {(this.state.userReady) ?
        <p style={{ position: 'fixed', bottom: 0, left: '1em' }}>User: {currentUser.user.username}</p>
        : null}
        <br/><br/>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Filename</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {this.state.currentItems && this.state.currentItems.map((item) => (
            <tr>
              <td>{item.originalname}</td>
              <td>{item.role[0]}</td>
              <td className="d-flex justify-content-around"><Button variant="danger" onClick={()=>this.deleteFile(item._id)}>Delete</Button></td>
            </tr>
          ))}
          </tbody>
        </Table>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={this.handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={this.state.pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    );
  }
}

export default withRouter(Dashboard);