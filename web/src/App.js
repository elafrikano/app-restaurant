import React, { Component } from "react";
import Login from "./containers/login/Login";
import Search from "./containers/search/Search";
import ErrorBoundary from "./containers/error/ErrorBoundary";
import Modal from "./components/ModalAlert";
import LoadingModal from "./components/LoadingModal";

import { errors } from "./constants/messages";
import { getUserSession, setUserSession } from "./models/userModel";

class App extends Component {
  constructor() {
    super();
    this.state = {
      modal: { show: false, title: "", body: "" },
      loadingModal: { show: false },
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

  handleOpenLoading = () => {
    const loadingModal = { ...this.loadingModal };
    loadingModal.show = true;
    this.setState({ loadingModal });
  };

  handleCloseLoading = () => {
    const loadingModal = { ...this.loadingModal };
    loadingModal.show = false;
    this.setState({ loadingModal });
  };

  render() {
    const { modal, tokenSession, loadingModal } = this.state;
    return (
      <div className="App">
        <ErrorBoundary>
          {tokenSession ? (
            <Search
              logout={this.handleLogout}
              handleOpenLoading={this.handleOpenLoading}
              handleCloseLoading={this.handleCloseLoading}
            ></Search>
          ) : (
            <Login
              handleLogin={this.handleLogin}
              handleErrorLogin={this.handleErrorLogin}
              handleOpenLoading={this.handleOpenLoading}
              handleCloseLoading={this.handleCloseLoading}
            ></Login>
          )}

          <Modal
            show={modal.show}
            title={modal.title}
            body={modal.body}
            handleClose={this.handleClose}
          ></Modal>

          <LoadingModal
            show={loadingModal.show}
            handleClose={this.handleCloseLoading}
          ></LoadingModal>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
