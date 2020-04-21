import React from "react";
import DrawerToggleButton from "./drawerToggleButton/DrawerToggleButton";
import { Link } from "react-router-dom";
import "./toolBar.css";

class ToolBar extends React.Component {
  renderNav() {
    return (
      <div className="tool-bar" role="navigation">
        <DrawerToggleButton />
        <nav className="tool-bar__nav">
          <ul>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/breathe">Begin</Link>
            </li>
          </ul>
        </nav>
        <div className="spacer" />
        {this.props.location.pathname !== "/" ? (
          <img
            className="app-logo-toolbar_landing-page"
            src="/images/brain_Plus_Heart_Black.png"
            alt="icons of a brain, a plus sign and a heart"
          />
        ) : (
          ""
        )}
        <div className="spacer" />
        <div className="nav-spacer" />
      </div>
    );
  }

  render() {
    return this.renderNav();
  }
}

export default ToolBar;
