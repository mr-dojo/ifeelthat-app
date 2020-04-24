import React from "react";
import Button from "../../../components/button/Button";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "../../../config";
import { withRouter } from "react-router-dom";
import StoreContext from "../../../StoreContext";
import { scroller } from "react-scroll";
import "./shareAudio.css";

class ShareAudio extends React.Component {
  static contextType = StoreContext;

  state = {
    submitted: false,
    breathButtonText: "Start",
  };

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
        return this.setState({
          submitted: true,
        });
      });
  };

  handleCancel = () => {
    this.props.cancel();
  };

  scrollToSection() {
    scroller.scrollTo("share_buttons", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }

  renderForm = () => {
    if (!this.state.submitted) {
      return (
        <section>
          <div className="div-container_eighty-vh section_margin">
            <h2>How</h2>
            <ol>
              <li>
                Record a 60 second clip using your favorite audio recorder
              </li>
              <li>
                Upload it to SoundCloud as a private file and title it "
                {this.context.feeling.color}+{this.context.feeling.emotion}"
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
          </div>
        </section>
      );
    } else {
      return (
        <section>
          <div className="div-container_eighty-vh section_margin">
            <p className="medium-text">
              How do you feel <strong>now?</strong>
            </p>
            <p className="small-text">What, if anything, is different?</p>
            <p className="xtra-small-text">
              Take another deep breath and be mindful of any feelings that come
              up.
            </p>
            <Button
              buttonText={this.state.breathButtonText}
              onClick={() => {
                let inCount = 5;
                let outCount = 5;
                let timer = setInterval(() => {
                  if (inCount !== 0) {
                    this.setState({
                      breathButtonText: `Breathe In ${inCount}`,
                    });
                    inCount = inCount - 1;
                  } else if (outCount !== 0) {
                    this.setState({
                      breathButtonText: `Breathe Out ${outCount}`,
                    });
                    outCount--;
                  } else {
                    clearInterval(timer);
                    return this.setState(
                      {
                        breathButtonText: "Start",
                      },
                      () => {
                        this.scrollToSection();
                      }
                    );
                  }
                }, 1000);
              }}
            ></Button>
          </div>
        </section>
      );
    }
  };

  render() {
    return (
      <>
        {this.renderForm()}
        <section id="another-breath" className="share_buttons">
          <div className="div-container_eighty-vh section_margin">
            <p className="medium-text">
              Select <strong>Listen</strong> to see other people's posts about{" "}
              {this.context.feeling.emotion}.
            </p>
            <Link className="nav-link" to="/listen">
              <Button buttonText="Listen" />
            </Link>
            <p className="medium-text">
              Select <strong>Breathe</strong> to ground into your body again and
              identify another emotion.
            </p>
            <Link to="/breathe">
              <Button buttonText="Breathe" />
            </Link>
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(ShareAudio);
