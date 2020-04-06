import React from "react";
import Button from "../../../components/button/Button";

export default class ShareAudio extends React.Component {
  render() {
    return (
      <section>
        <h2>How</h2>
        <ol>
          <li>Record a 60 second clip using your favorite audio recorder</li>
          <li>
            Upload it to SoundCloud as a private file and title it "[your
            emotion]+[your color]"
          </li>
          <li>Click "Go to your track" >>> "Share" >>> "Embed"</li>
          <li>
            Copy the "Code" link and paste it below
            <form>
              <label
                for="embeded-audio-link"
                aria-label="Embeded Audio Link Input"
              ></label>
              <input
                type="text"
                name="embeded-audio-link"
                placeholder="Paste the code here"
              ></input>
              <Button buttonText="Share" buttonType="submit" />
            </form>
          </li>
        </ol>
      </section>
    );
  }
}
