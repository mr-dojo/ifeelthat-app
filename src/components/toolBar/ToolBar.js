import React from "react";
import DrawerToggleButton from "./drawerToggleButton/DrawerToggleButton";
import "./toolBar.css";

class ToolBar extends React.Component {
  renderNav = (props) => {
    return (
      <div className="top-bar" role="navigation">
        <DrawerToggleButton />
        <div className="spacer" />
      </div>
    );
  };

  render() {
    return this.renderNav();
  }
}

export default ToolBar;
