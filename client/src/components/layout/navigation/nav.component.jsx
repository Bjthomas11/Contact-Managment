import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/auth/authContext";

const NavBar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);

  const { isAuth, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a href="#!" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guessLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuth ? authLinks : guessLinks}</ul>
    </div>
  );
};

export default NavBar;
