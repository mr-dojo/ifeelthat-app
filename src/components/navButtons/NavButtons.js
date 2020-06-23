import React from "react";
import Button from "../../components/button/Button";
import StoreContext from "../../StoreContext";
import { Link } from "react-router-dom";
import "./navButtons.css";

class NavButtons extends React.Component {
  static contextType = StoreContext;

  renderIdentifyButton = () => {
    return (
      <div className="nav-button_container">
        <Link to="/breathe">
          <Button
            buttonText="Identify"
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
        </Link>
        <p className="extra-small-text nav-button_text">
          Ground into your body again and identify another emotion.
        </p>
      </div>
    );
  };

  renderListenButton = () => {
    return (
      <div className="nav-button_container">
        <Link className="nav-link" to="/listen">
          <Button
            buttonText="Listen"
            onClick={(e) => {
              e.preventDefault();
              const stepObj = { path: "/listen" };
              this.context.setSessionStorage("step", stepObj);
              this.context.handleRedirect("/listen");
            }}
          />
        </Link>
        <p className="extra-small-text nav-button_text">
          Read other people's posts about{" "}
          {this.context.feeling.emotion
            ? this.context.feeling.emotion
            : "the emotion you are experiencing"}
          .
        </p>
      </div>
    );
  };

  renderShareButton = () => {
    return (
      <div className="nav-button_container">
        <Link to="/share">
          <Button
            buttonText="Share"
            onClick={() => {
              const stepObj = { path: "/share" };
              this.context.setSessionStorage("step", stepObj);
              this.context.handleRedirect("/share");
            }}
          />
        </Link>
        <p className="extra-small-text nav-button_text">
          Anonymously talk about{" "}
          {this.context.feeling.emotion
            ? `your ${this.context.feeling.emotion}`
            : "the emotion you are experiencing"}
          .
        </p>
      </div>
    );
  };

  renderSurveyButton = () => {
    return (
      <div className="nav-button_container">
        <Link to="/survey">
          <Button
            buttonText="Give Feedback"
            onClick={() => {
              const stepObj = { path: "/survey" };
              this.context.setSessionStorage("step", stepObj);
              this.context.handleRedirect("/survey");
            }}
          />
        </Link>
        <p className="extra-small-text nav-button_text">
          Fill out an anonymous survey. (takes aprox. 1 minute)
        </p>
      </div>
    );
  };

  render() {
    return (
      <>
        <header className="flatten">
          <h1 className="flatten transparent">Navigation</h1>
        </header>
        {this.props.identify ? this.renderIdentifyButton() : ""}
        {this.props.listen ? this.renderListenButton() : ""}
        {this.props.share ? this.renderShareButton() : ""}
        {this.props.survey ? this.renderSurveyButton() : ""}
      </>
    );
  }
}

export default NavButtons;
