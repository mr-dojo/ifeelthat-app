import React from "react";
import Button from "../button/Button";
import "./areYouSure.css";

class AreYouSure extends React.Component {
  render() {
    return (
      <div className="are-you-sure_container">
        <p className="are-you-sure_text extra-small-text">
          Are you sure you want to do that?
        </p>
        <Button
          buttonText="I'm sure"
          onClick={() => {
            this.props.yesCallback();
            console.log("finish submit");
          }}
        ></Button>
        <Button
          buttonText="Nevermind"
          onClick={() => {
            this.props.noCallback();
            console.log("back to current page");
          }}
        ></Button>
      </div>
    );
  }
}

export default AreYouSure;
