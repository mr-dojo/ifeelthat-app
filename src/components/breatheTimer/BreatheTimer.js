import React from "react";
import StoreContext from "../../StoreContext";
import Button from "../button/Button";
import "./breatheTimer.css";

/* Renders a clickable opaque white overlay */
class BreatheTimer extends React.Component {
  static contextType = StoreContext;

  state = {
    timerDivClasses: "breathe-timer",
  };

  buttonActions = this.context.breatheTimerButtonActions;

  componentDidMount() {
    // Initiate the component fade-in animation
    this.setState({
      timerDivClasses: "breathe-timer breathe-timer_fade-in",
    });
  }

  render() {
    return (
      <div className={this.state.timerDivClasses}>
        <div className="breathe-timer_white" />
        <div className="breathe-timer_black" />
        <div className="breathe-timer_animation" />
        <Button
          buttonClass="breathe-timer_exit-button button"
          buttonText="Ready"
          onClick={() => {
            this.context.handleToggleBreatheTimer();
          }}
        />
      </div>
    );
  }
}

export default BreatheTimer;
