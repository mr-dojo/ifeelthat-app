import React from "react";
import DrawerToggleButton from "./drawerToggleButton/DrawerToggleButton";
import { Link } from "react-router-dom";
import "./toolBar.css";

class ToolBar extends React.Component {
  renderNav() {
    return (
      <div className="tool-bar" role="navigation">
        <DrawerToggleButton />
        {this.props.location.pathname !== "/" ? (
          <span className="tool-bar__app-name">Listen.Share.</span>
        ) : (
          ""
        )}
        <div className="spacer" />
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
      </div>
    );
  }

  render() {
    return this.renderNav();
  }
}

export default ToolBar;
