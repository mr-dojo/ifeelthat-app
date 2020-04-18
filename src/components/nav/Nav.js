import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

class Nav extends React.Component {
  render() {
    return (
      <nav className="nav-element" role="navigation">
        <Link className="nav-link" to="/listen">
          temp link to Listen page
        </Link>
        <Link className="nav-link" to="/share">
          temp link to Share page
        </Link>
      </nav>
    );
  }
}

export default Nav;
