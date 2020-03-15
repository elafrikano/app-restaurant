import React from "react";

import { Navbar } from "react-bootstrap";

function NavApp(props) {
  const { name, lastName } = props.user;
  return (
    <Navbar className="navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <div className="h4 font-weight-bold mb-1">App Restaurant</div>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item mx-1">
          <a
            className="nav-link font-weight-bold"
            href="#"
            onClick={props.logout}
          >
            Logout
          </a>
        </li>
        <div className="topbar-divider d-none d-sm-block"></div>

        <div className="nav-item dropdown no-arrow">
          <a className="nav-link" href="#">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {name} {lastName}
            </span>
          </a>
        </div>
      </ul>
    </Navbar>
  );
}

export default NavApp;
