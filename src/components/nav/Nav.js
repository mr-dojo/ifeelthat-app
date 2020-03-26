import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

class Nav extends React.Component {
  render() {
    return (
      <nav className="nav-element" role="navigation">
        <Link className="nav-link" to="/">
          Landing Page
        </Link>
        <Link className="nav-link" to="/breathe">
          Feel
        </Link>
        <Link className="nav-link" to="/listen">
          Listen
        </Link>
        <Link className="nav-link" to="/share">
          Share
        </Link>
      </nav>
    );
  }
}

export default Nav;
