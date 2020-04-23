import React from "react";
import StoreContext from "../../StoreContext";
import { Link } from "react-router-dom";
import "./sideDrawer.css";

class SideDrawer extends React.Component {
  static contextType = StoreContext;

  render() {
    let drawerClasses = "side-drawer";

    if (this.context.sideDrawerOpen) {
      drawerClasses = "side-drawer open";
    }

    return (
      <nav className={drawerClasses}>
        <img
          src="/images/brain_Plus_Heart_White.png"
          alt="Head plus heart icons"
        />
        <ul>
          <li onClick={() => this.context.handleToggleSideDrawer()}>
            <Link to="/">About</Link>
          </li>
          <li onClick={() => this.context.handleToggleSideDrawer()}>
            <Link
              to="/breathe"
              onClick={(e) => {
                e.preventDefault();
                window.sessionStorage.clear();
                this.context.handleRedirect("/breathe");
              }}
            >
              Begin
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default SideDrawer;
