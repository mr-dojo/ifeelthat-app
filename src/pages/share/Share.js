import React from "react";
import ShareText from "./shareText/ShareText";
import ShareAudio from "./shareAudio/ShareAudio";
import Button from "../../components/button/Button";

class Share extends React.Component {
  state = {
    shareType: "None",
  };

  handleShareTypeSubmit = (e) => {
    e.preventDefault();
    this.setState({
      shareType: e.target.type.value,
    });
  };

  renderTypeForm = () => {
    return (
      <section>
        <form onSubmit={(e) => this.handleShareTypeSubmit(e)}>
          <label htmlFor="share-intention">Choose how you want to share</label>
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
          <p>We keep this a safe place by self monitoring</p>
          <p>
            Please, when sharing, do <strong>not</strong> use names or details
            of others
          </p>
          <p>
            Talk about <strong>your own</strong> experience
          </p>
          <p>Please be honest and speak from your heart</p>
        </section>
        {this.state.shareType === "None" ? (
          this.renderTypeForm()
        ) : this.state.shareType === "Text" ? (
          <ShareText />
        ) : (
          <ShareAudio />
        )}
      </>
    );
  }
}

export default Share;
