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

  renderIframeForm = () => {
    return (
      <section>
        <div className="div-container_eighty-vh section_margin">
          <h2>How</h2>
          <div className="audio-instructions">
            <p className="xtra-small-text">
              Record a 60 second clip using your favorite audio recorder
              <br />
              Upload it to SoundCloud as a private file and title it "
              {this.context.feeling.emotion}"<br />
              Click "Go to your track" >>> "Share" >>> "Embed"
              <br />
              Copy the "Code" link and paste it below
            </p>
          </div>

          <form onSubmit={(e) => this.handleLinkSubmit(e)}>
            <label
              htmlFor="embeded-audio-link"
              aria-label="Embeded Audio Link Input"
            ></label>
            <input
              className="iframe-input"
              type="text"
              name="embeded-audio-link"
              id="iframe"
              placeholder="Paste the code here"
            ></input>
            <Button buttonText="Share" buttonType="submit" />
            <Button buttonText="Cancel" onClick={(e) => this.handleCancel()} />
          </form>
        </div>
      </section>
    );
  };

  renderAfterSubmit = () => {
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
  };

  renderNavOptions = () => {
    return (
      <section id="js-share-buttons" className="share_buttons">
        <div className="div-container_eighty-vh section_margin">
          <p className="medium-text">
            Select <strong>Listen</strong> to see other people's posts about{" "}
            {this.context.feeling.emotion}.
          </p>
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
          <p className="medium-text">
            Select <strong>Breathe</strong> to ground into your body again and
            identify another emotion.
          </p>
          <Link to="/breathe">
            <Button
              buttonText="Breathe"
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
        </div>
      </section>
    );
  };

  render() {
    return (
      <>
        {!this.state.submitted
          ? this.renderIframeForm()
          : this.renderAfterSubmit}
        {this.renderNavOptions()}
      </>
    );
  }
}

export default withRouter(ShareAudio);
