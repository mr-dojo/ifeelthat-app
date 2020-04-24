import React from "react";
import DrawerToggleButton from "./drawerToggleButton/DrawerToggleButton";
import StoreContext from "../../StoreContext";
import { Link } from "react-router-dom";
import "./toolBar.css";

class ToolBar extends React.Component {
  static contextType = StoreContext;
  renderNav() {
    return (
      <div className="tool-bar" role="navigation">
        <DrawerToggleButton />
        <nav className="tool-bar__nav">
          <ul>
            <li>
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  const stepObj = { path: "/" };
                  this.context.setSessionStorage("step", stepObj);
                  this.context.handleRedirect("/");
                }}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/breathe"
                onClick={(e) => {
                  e.preventDefault();
                  const stepObj = { path: "/breathe", section: 1 };
                  this.context.setSessionStorage("step", stepObj);
                  this.context.handleRedirect("/breathe");
                }}
              >
                Begin
              </Link>
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
