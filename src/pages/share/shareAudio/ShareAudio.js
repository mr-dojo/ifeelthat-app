import React from "react";
import Button from "../../../components/button/Button";

export default class ShareAudio extends React.Component {
  handleLinkSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  //<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/792366031%3Fsecret_token%3Ds-d720mgO62E7&color=%23201812&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
  //https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/792329326%3Fsecret_token%3Ds-0fZdm04kM2i&color=%23201812&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false"
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
            <form onSubmit={(e) => this.handleLinkSubmit(e)}>
              <label
                for="embeded-audio-link"
                aria-label="Embeded Audio Link Input"
              ></label>
              <input
                type="text"
                name="embeded-audio-link"
                id="audio-link"
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
