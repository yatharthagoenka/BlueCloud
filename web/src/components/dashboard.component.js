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
    this.uploadFile = this.uploadFile.bind(this);

    this.state = {
      redirect: null,
      userReady: false,
      message: '',
      loading: false,
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
      </div>
    );
  }
}

export default withRouter(Dashboard);