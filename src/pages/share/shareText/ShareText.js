import React from "react";
import Button from "../../../components/button/Button";
import { Link } from "react-router-dom";
import StoreContext from "../../../StoreContext";
import { API_ENDPOINT } from "../../../config";
import { scroller } from "react-scroll";

/* Renders a text input form */
export default class ShareText extends React.Component {
  static contextType = StoreContext;
  constructor(props) {
    super();
    this.state = {
      submitted: false,
      canceled: false,
      breathButtonText: "Start",
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
  }

  handleTextDelete = (e) => {
    e.preventDefault();
    this.setState({
      submitted: true,
      shareText: "",
    });
  };

  handleTextChange = (e) => {
    this.setState({
      shareText: e.target.value,
    });
  };

  handleTextSubmit = (e) => {
    e.preventDefault();
    const { id, emotion } = this.context.feeling;
    const text = this.state.shareText;
    const newShare = {
      text_share: text,
      share_type: "Text",
      feeling_id: id,
      emotion: emotion,
    };

    this.setState({
      submitted: true,
    });

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
      .then((resJson) => {});
  };

  scrollToSection() {
    scroller.scrollTo("share_buttons", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }

  handleCancel = () => {
    this.setState({
      canceled: true,
    });
    const stepObj = { path: "/share", submitted: false };
    this.context.setSessionStorage("step", stepObj);
  };

  renderTextForm = () => {
    return (
      <section>
        <div className="div-container_eighty-vh section_margin">
          <h2>
            {this.context.feeling.emotion
              ? `Feeling of ${this.context.feeling.emotion}`
              : ""}
          </h2>
          <form
            onSubmit={this.handleTextSubmit}
            onChange={this.handleTextChange}
          >
            <label htmlFor="share-text">Express yourself below</label>
            <textarea
              type="text"
              rows="10"
              columns="30"
              name="share-text"
              id="text"
              value={this.state.shareText}
              required
            ></textarea>
            <Button buttonText="Share it" buttonType="submit"></Button>
            {!this.state.shareText ? (
              <Button
                buttonText="Cancel"
                onClick={(e) => this.handleCancel()}
              />
            ) : (
              <Button
                buttonText="Burn it"
                onClick={(e) => this.handleTextDelete(e)}
              ></Button>
            )}
          </form>
        </div>
      </section>
    );
  };

  renderAfterSubmit = () => {
    return (
      <>
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
        {this.renderNavOptions()}
      </>
    );
  };

  renderNavOptions = () => {
    return (
      <section id="js-share-buttons" className="share_buttons">
        <div className="div-container_eighty-vh section_margin">
          <p className="medium-text">
            Select <strong>Listen</strong> to find other people's posts about{" "}
            {this.context.feeling.emotion
              ? this.context.feeling.emotion
              : "the emotion you are experiencing"}
            .
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
          ? !this.state.canceled
            ? this.renderTextForm()
            : this.renderNavOptions()
          : this.renderAfterSubmit()}
      </>
    );
  }
}
