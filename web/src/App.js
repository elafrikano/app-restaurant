import React, { Component } from "react";
import Login from "./containers/login/Login";
import Search from "./containers/search/Search";
import ErrorBoundary from "./containers/error/ErrorBoundary";
import Modal from "./components/ModalAlert";

import { errors } from "./constants/messages";
import { getUserSession, setUserSession } from "./models/userModel";

class App extends Component {
  constructor() {
    super();
    this.state = {
      modal: { show: false, title: "", body: "" },
      tokenSession: getUserSession() || ""
    };
  }

  handleLogin = () => {
    const tokenSession = getUserSession();
    this.setState({ tokenSession });
  };

  handleLogout = () => {
    const tokenSession = "";
    setUserSession(tokenSession);
    this.setState({ tokenSession });
  };

  handleErrorLogin = error => {
    if (error.status === 401) {
      let modal = { ...this.state.modal };

      modal.show = true;
      modal.title = errors[401].title;
      modal.body = errors[401].body;
      this.setState({ modal });
    }
  };

  handleClose = () => {
    const modal = { ...this.modal };
    modal.show = false;
    this.setState({ modal });
  };

  render() {
    const { modal, tokenSession } = this.state;
    return (
      <div className="App">
        <ErrorBoundary>
          {tokenSession ? (
            <Search logout={this.handleLogout}></Search>
          ) : (
            <Login
              handleLogin={this.handleLogin}
              handleErrorLogin={this.handleErrorLogin}
            ></Login>
          )}

          <Modal
            show={modal.show}
            title={modal.title}
            body={modal.body}
            handleClose={this.handleClose}
          ></Modal>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
