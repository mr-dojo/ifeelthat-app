import React from "react";
import Button from "../../components/button/Button";
import StoreContext from "../../StoreContext";
import "./navButtons.css";

class NavButtons extends React.Component {
  static contextType = StoreContext;

  renderIdentifyButton = () => {
    return (
      <div className="nav-button_container">
        <div className="nav-button_icon-container">
          <img
            className="nav-button_icon"
            src="/images/noun_emotions_black582951.png"
            alt="faces with different emotions"
          />
        </div>
        <Button
          buttonText="Identify"
          onClick={(e) => {
            e.preventDefault();
            const stepObj = { path: "/breathe", section: 1 };
            this.context.setSessionStorage("step", stepObj);
            this.context.handleRedirect("/breathe");
            this.context.updateBreatheSection(1);
            this.context.updateFeeling({
              emotion: "",
              color: "",
            });
          }}
        />
      </div>
    );
  };

  renderListenButton = () => {
    return (
      <div className="nav-button_container">
        <div className="nav-button_icon-container">
          <img
            className="nav-button_icon"
            src="/images/noun_Ear_black1853757.png"
            alt="icon of an ear"
          />
        </div>
        <Button
          buttonText="Listen"
          onClick={(e) => {
            e.preventDefault();
            const stepObj = { path: "/listen" };
            this.context.setSessionStorage("step", stepObj);
            this.context.handleRedirect("/listen");
          }}
        />
      </div>
    );
  };

  renderShareButton = () => {
    return (
      <div className="nav-button_container">
        <div className="nav-button_icon-container">
          <img
            className="nav-button_icon"
            src="/images/noun_speak_black1433088.png"
            alt="icon of a person speaking"
          />
        </div>
        <Button
          buttonText="Share"
          onClick={() => {
            const stepObj = { path: "/share" };
            this.context.setSessionStorage("step", stepObj);
            this.context.handleRedirect("/share");
            this.context.updateShareSection(1);
          }}
        />
      </div>
    );
  };

  renderSurveyButton = () => {
    return (
      <div className="nav-button_container">
        <Button
          buttonText="Give Feedback"
          onClick={() => {
            const stepObj = { path: "/survey" };
            this.context.setSessionStorage("step", stepObj);
            this.context.handleRedirect("/survey");
          }}
        />
      </div>
    );
  };

  render() {
    return (
      <>
        <header className="flatten">
          <h2 className="flatten transparent">Navigation</h2>
        </header>
        <div className="nav-button_dynamic-container">
          {this.props.identify ? this.renderIdentifyButton() : ""}
          {this.props.listen ? this.renderListenButton() : ""}
          {this.props.share ? this.renderShareButton() : ""}
        </div>
        {this.props.survey ? this.renderSurveyButton() : ""}
      </>
    );
  }
}

export default NavButtons;
