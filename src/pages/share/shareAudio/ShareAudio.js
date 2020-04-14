import React from "react";
import Button from "../../../components/button/Button";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "../../../config";
import StoreContext from "../../../StoreContext";

export default class ShareAudio extends React.Component {
  static contextType = StoreContext;

  handleLinkSubmit = (e) => {
    e.preventDefault();
    const { feeling } = this.context;
    let url = "";
    // break down the iframe link and look for the url
    const iframe = e.target.iframe.value.split(`"`);
    iframe.forEach((section) => {
      if (section.includes("http")) {
        url = section.split("&");
        url = `<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="${url[0]}&color=%23201812&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false"></iframe>`;
      }
    });
    const newShare = {
      audio_share: url,
      share_type: "Audio",
      feeling_id: feeling.id,
      emotion: feeling.emotion,
    };
    fetch(`${API_ENDPOINT}share`, {
      method: "POST",
      body: JSON.stringify(newShare),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return new Error(res.message);
        }
        return res.json();
      })
      .then((resJson) => {
        document.getElementById("another-breath").scrollIntoView(true);
      });
  };

  //&color=%23201812&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false"
  //<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/792366031%3Fsecret_token%3Ds-d720mgO62E7&color=%23201812&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
  //https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/792329326%3Fsecret_token%3Ds-0fZdm04kM2i&color=%23201812&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false"

  render() {
    return (
      <>
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
                  htmlFor="embeded-audio-link"
                  aria-label="Embeded Audio Link Input"
                ></label>
                <input
                  type="text"
                  name="embeded-audio-link"
                  id="iframe"
                  placeholder="Paste the code here"
                ></input>
                <Button buttonText="Share" buttonType="submit" />
              </form>
            </li>
          </ol>
        </section>
        <section id="another-breath">
          <p>
            Take another deep breath and appreciate the lightness that comes
            from expressing these feelings
          </p>
          <Link className="nav-link" to="/listen">
            <Button buttonText="Listen" />
          </Link>
        </section>
      </>
    );
  }
}
