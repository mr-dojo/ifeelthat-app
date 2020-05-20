import React from "react";
import DrawerToggleButton from "./drawerToggleButton/DrawerToggleButton";
import StoreContext from "../../StoreContext";
import { Link } from "react-router-dom";
import "./toolBar.css";

/* Top menu */
class ToolBar extends React.Component {
  static contextType = StoreContext;
  renderNav() {
    return (
      <div className="tool-bar">
        <DrawerToggleButton />
        <nav className="tool-bar__nav" role="navigation">
          <ul>
            <li>
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  const stepObj = { path: "/" };
                  this.context.setSessionStorage("step", stepObj);
                  this.context.handleRedirect("/");
                  this.context.updateFeeling({
                    emotion: "",
                    color: "",
                  });
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
                  this.context.updateFeeling({
                    emotion: "",
                    color: "",
                  });
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
            src="/images/noun_Fingerprint_286941.png"
            alt="fingerprint"
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
