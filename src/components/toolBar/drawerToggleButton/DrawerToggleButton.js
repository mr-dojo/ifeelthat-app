import React from "react";
import StoreContext from "../../../StoreContext";
import "./drawerToggleButton.css";

class DrawerToggleButton extends React.Component {
  static contextType = StoreContext;

  render() {
    return (
      <div
        className="toggle-button"
        onClick={() => this.context.handleToggleSideDrawer()}
      >
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
        <div className="toggle-button__line" />
      </div>
    );
  }
}

export default DrawerToggleButton;
