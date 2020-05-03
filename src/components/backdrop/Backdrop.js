import React from "react";
import StoreContext from "../../StoreContext";
import "./backdrop.css";

/* Renders a clickable opaque white overlay */
class Backdrop extends React.Component {
  static contextType = StoreContext;
  render() {
    return (
      <div
        className="backdrop"
        onClick={() => this.context.handleToggleSideDrawer()}
      />
    );
  }
}

export default Backdrop;
