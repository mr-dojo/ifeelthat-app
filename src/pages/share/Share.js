import React from "react";
import ShareText from "./shareText/ShareText";
import ShareAudio from "./shareAudio/ShareAudio";
import Button from "../../components/button/Button";

class Share extends React.Component {
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
        <section>
          <form>
            <label htmlFor="share-intention">
              Choose how you want to share
            </label>
            <select name="share-type">
              <option value="text">Text</option>
              <option value="audio">Audio</option>
            </select>
            <Button buttonText="Select" buttonType="submit"></Button>
          </form>
        </section>
        <ShareText />
        <ShareAudio />
        <section>
          <p>
            Take another deep breath and appreciate the lightness that comes
            from expressing these feelings
          </p>
        </section>
        <Button buttonText="Share it"></Button>
        <Button buttonText="Burn it / Delete"></Button>
      </>
    );
  }
}

export default Share;
