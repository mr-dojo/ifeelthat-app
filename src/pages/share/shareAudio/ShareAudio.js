import React from "react";
import Button from "../../../components/button/Button";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "../../../config";
import { withRouter } from "react-router-dom";
import StoreContext from "../../../StoreContext";

class ShareAudio extends React.Component {
  static contextType = StoreContext;

  static defaultProps = {
    match: {
      params: {},
    },
  };

  handleLinkSubmit = (e) => {
    e.preventDefault();
    const { feeling } = this.context;
    let url = "";
    // break down the iframe link and look for the url
    const iframe = e.target.iframe.value.split(`"`);
    iframe.forEach((section) => {
      if (section.includes("http")) {
        url = section.split("&");
      }
    });

    const newShare = {
      audio_share: url[0],
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

  handleCancel = () => {
    this.props.cancel();
  };

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
                <Button
                  buttonText="Cancel"
                  onClick={(e) => this.handleCancel()}
                />
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
          <Link to="/breathe">
            <Button buttonText="Breathe" />
          </Link>
        </section>
      </>
    );
  }
}

export default withRouter(ShareAudio);
