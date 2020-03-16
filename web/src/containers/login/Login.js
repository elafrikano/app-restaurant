import React, { Component } from "react";
import axios from "axios";
import qs from "qs";

import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";

import { setUserSession } from "../../models/userModel";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      disabled: true,
      errors: {
        email: false,
        password: false
      }
    };
  }

  componentDidUpdate(_, prevState) {
    const { email, password, errors } = this.state;
    let disabled = true;
    if (email !== prevState.email || password !== prevState.password) {
      if (email && !errors.email && password && !errors.password)
        disabled = false;
      this.setState({ disabled });
    }
  }

  handleChangueEmail = event => {
    const email = event.target.value;

    this.validateEmail(email);

    this.setState({ email });
  };

  handleChanguePassword = event => {
    const password = event.target.value;

    this.validatePassword(password);

    this.setState({ password });
  };

  handleSubmit = async () => {
    const { email, password } = this.state;
    const { handleLogin, handleOpenLoading, handleCloseLoading } = this.props;

    this.setState({ disabled: true });
    handleOpenLoading();
    try {
      const response = await axios({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        url: "http://localhost:8080/api/user/login",
        data: qs.stringify({
          email,
          password
        })
      });
      this.setState({ disabled: false });
      handleCloseLoading();
      if (response.status === 200) {
        const { data } = response;
        setUserSession(data.access_token);
      }

      handleLogin();
    } catch (error) {
      const { handleErrorLogin } = this.props;
      let response;
      if (error.response) {
        response = error.response;
      } else if (error.request) {
        response = error.request;
      } else {
        response = error.message;
      }
      handleErrorLogin(response);
      handleCloseLoading();
    }
  };

  validateEmail = email => {
    const errors = { ...this.state.errors };

    errors.email = !/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+).([a-zA-Z]{2,5})$/.test(
      email
    );

    this.setState({ errors });
  };

  validatePassword = password => {
    const errors = { ...this.state.errors };

    errors.password = !(password.length >= 5);

    this.setState({ errors });
  };

  render() {
    const { email, password, errors, disabled } = this.state;
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xl="10" lg="12" md="9">
            <Card className="o-hidden border-0 shadow-lg my-5">
              <Card.Body className="p-0">
                <Row>
                  <Col
                    lg="6"
                    className="d-none d-lg-block bg-login-image"
                  ></Col>
                  <Col lg="6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Login</h1>
                      </div>
                      <Form className="user">
                        <Form.Group>
                          <Form.Control
                            name="email"
                            type="email"
                            className="form-control-user"
                            aria-describedby="emailHelp"
                            placeholder="Introduzca su Email..."
                            value={email}
                            onChange={this.handleChangueEmail}
                            isInvalid={errors.email}
                            autoComplete="off"
                          ></Form.Control>
                          <Form.Control.Feedback
                            type="invalid"
                            className="ml-4"
                          >
                            Introduzca un email valido
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            name="password"
                            type="password"
                            className="form-control form-control-user"
                            placeholder="Password"
                            value={password}
                            onChange={this.handleChanguePassword}
                            isInvalid={errors.password}
                          ></Form.Control>
                          <Form.Control.Feedback
                            type="invalid"
                            className="ml-4"
                          >
                            Su password debe ser de al menos 5 caracteres
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Button
                          className="btn-danger btn-user btn-block"
                          onClick={this.handleSubmit}
                          disabled={disabled}
                        >
                          Login
                        </Button>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
