import React from "react";
import DrawerToggleButton from "./drawerToggleButton/DrawerToggleButton";
import StoreContext from "../../StoreContext";
import { Link } from "react-router-dom";
import { scroller } from "react-scroll";
import "./toolBar.css";
import Button from "../button/Button";

/* Top menu */
class ToolBar extends React.Component {
  static contextType = StoreContext;

  scrollToSection(section) {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }

  renderNav() {
    return (
      <div className="tool-bar">
        <DrawerToggleButton />
        <nav className="tool-bar__nav" role="navigation">
          <ul>
            <li>
              <Button
                aria-label="learn about Authentic"
                buttonText="About"
                buttonTextClass="tool-bar_about-button-text"
                buttonClass="button tool-bar_about-button"
                onClick={async (e) => {
                  e.preventDefault();
                  const stepObj = { path: "/" };
                  this.context.setSessionStorage("step", stepObj);
                  await this.context.handleRedirect("/");
                  this.scrollToSection("section-2");
                  this.context.updateFeeling({
                    emotion: "",
                    color: "",
                  });
                }}
              />
            </li>
            <li>
              <Button
                buttonText="Begin"
                buttonTextClass="tool-bar_about-button-text"
                buttonClass="button tool-bar_about-button"
                aria-label="start the process"
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
              />
            </li>
          </ul>
        </nav>
        <div>
          {this.props.location.pathname !== "/" ? (
            <Link
              to="/"
              aria-label="learn about Authentic"
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
              <img
                className="app-logo-toolbar_landing-page"
                src="/images/noun_Fingerprint_286941.png"
                alt="fingerprint"
              />
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="nav-spacer" />
      </div>
    );
  }

  render() {
    return this.renderNav();
  }
}

export default ToolBar;
