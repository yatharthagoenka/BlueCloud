import React, { Component } from "react";
import AppService from "../services/app.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    AppService.getTestContent().then(
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

  render() {
    return (
      <div className="container">
          <p style={{ position: 'fixed', bottom: 0, left: '1em' }}>{this.state.content}</p>
      </div>
    );
  }
}
