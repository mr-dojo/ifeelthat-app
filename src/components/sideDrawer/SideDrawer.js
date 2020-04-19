import React from "react";
import { Link } from "react-router-dom";
import "./sideDrawer.css";

const SideDrawer = (props) => {
  return (
    <nav className="side-drawer">
      <ul>
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          <Link to="/Breathe">Begin</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
