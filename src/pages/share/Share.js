import React from "react";
import ShareText from "./shareText/ShareText";
import ShareAudio from "./shareAudio/ShareAudio";
import Button from "../../components/button/Button";

class Share extends React.Component {
  state = {
    shareType: "None",
  };

  componentDidMount() {
    if (window.sessionStorage.getItem("step")) {
      const step = window.sessionStorage.getItem("step");
      const stepObj = JSON.parse(step);
      if (stepObj.path === "/share") {
        this.setState({
          shareType: stepObj.shareType,
        });
      } else {
        this.setLocalStorage();
      }
    }
  }

  setLocalStorage = () => {
    window.sessionStorage.setItem(
      "step",
      JSON.stringify({
        path: "/share",
        shareType: this.state.shareType,
      })
    );
  };

  handleShareTypeSubmit = (e) => {
    e.preventDefault();
    this.setState(
      {
        shareType: e.target.type.value,
      },
      () => this.setLocalStorage()
    );
  };

  handleCancel = () => {
    this.setState(
      {
        shareType: "None",
      },
      () => this.setLocalStorage()
    );
  };

  renderTypeForm = () => {
    return (
      <section>
        <form onSubmit={(e) => this.handleShareTypeSubmit(e)}>
          <label htmlFor="share-intention" className="medium-text">
            Choose how you want to share
          </label>
          <select name="share-type" id="type">
            <option value="Text">Text</option>
            <option value="Audio">Audio</option>
          </select>
          <Button buttonText="Select" buttonType="submit"></Button>
        </form>
      </section>
    );
  };

  render() {
    return (
      <>
        <header>
          <h1>Share</h1>
        </header>
        <section>
          <h2>Guidelines</h2>
          <p className="medium-text">
            We keep this a safe place by self monitoring
          </p>
          <p className="small-text">
            Please, when sharing, <strong>do not</strong> use names or details
            of others
          </p>
          <p className="small-text">
            Talk about <strong>your own</strong> experience
          </p>
          <p className="small-text">
            Please be honest and speak from your heart
          </p>
        </section>
        {this.state.shareType === "None" ? (
          this.renderTypeForm()
        ) : this.state.shareType === "Text" ? (
          <ShareText cancel={this.handleCancel} />
        ) : (
          <ShareAudio cancel={this.handleCancel} />
        )}
      </>
    );
  }
}

export default Share;
