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
  }
}

export default SideDrawer;
