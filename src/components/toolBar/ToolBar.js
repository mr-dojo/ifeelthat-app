import React from "react";
import DrawerToggleButton from "./drawerToggleButton/DrawerToggleButton";
import "./toolBar.css";

class ToolBar extends React.Component {
  renderNav() {
    return (
      <div className="tool-bar" role="navigation">
        <DrawerToggleButton />
        <div className="spacer" />
        {this.props.location.pathname !== "/" ? (
          <span className="tool-bar__app-name">Listen.Share.</span>
        ) : (
          ""
        )}
      </div>
    );
  }

  render() {
    return this.renderNav();
  }
}

export default ToolBar;
