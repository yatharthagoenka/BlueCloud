import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import AppService from "../services/app.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { withRouter } from "../common/with-router";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleFileInput = this.handleFileInput.bind(this);

    this.state = {
      redirect: null,
      userReady: false,
      message: '',
      selectedFile: null,
      currentUser: ''
    };
  }

  handleFileInput(event) {
    this.setState({
      selectedFile: event.target.files[0],
    })
  }

  uploadFile(e){
    e.preventDefault();

    const data = new FormData()
    data.append('file', this.state.selectedFile)

    AppService.uploadFile(data, this.state.currentUser.user._id, JSON.parse(localStorage.getItem("user")).token).then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }
  
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
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
              <button className="btn btn-primary btn-block">
                <span>Upload</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
          </Form>
        {(this.state.userReady) ?
        <p style={{ position: 'fixed', bottom: 0, left: '1em' }}>User: {currentUser.user._id}</p>
        : null}
      </div>
    );
  }
}

export default withRouter(Dashboard);