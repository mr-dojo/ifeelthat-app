import React from "react";
import ShareText from "./shareText/ShareText";
import ShareAudio from "./shareAudio/ShareAudio";
import Button from "../../components/button/Button";
import StoreContext from "../../StoreContext";
import { scroller } from "react-scroll";

class Share extends React.Component {
  static contextType = StoreContext;

  state = {
    onTopOfPage: true,
  };

  componentDidMount() {
    this.watchScrollPosition();
  }

  watchScrollPosition = () => {
    window.onscroll = () => {
      if (window.pageYOffset === 0 && !this.state.onTopOfPage) {
        this.setState({
          onTopOfPage: true,
        });
      } else if (window.pageYOffset !== 0 && this.state.onTopOfPage) {
        this.setState({
          onTopOfPage: false,
        });
      }
    };
  };

  scrollToSection() {
    scroller.scrollTo("choose-type_section", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }

  handleShareTypeSubmit = (e) => {
    e.preventDefault();
    const shareType = e.target.type.value;
    const stepObj = { path: "/share", shareType: shareType, submitted: false };
    this.context.setSessionStorage("step", stepObj);
    this.context.updateShareType(shareType);
  };

  handleCancel = () => {
    const stepObj = { path: "/share", shareType: "None", submitted: false };
    this.context.setSessionStorage("step", stepObj);
    this.context.updateShareType("None");
  };

  renderDownArrow = () => {
    return this.state.onTopOfPage ? (
      <div
        className="down-arrow_container_breathe-page"
        onClick={() => this.scrollToSection()}
      >
        <img
          className="down-arrow_breathe-page"
          src="/images/Arrow_Down_Black1920765.png"
          alt="icon of arrow pointing down"
        />
      </div>
    ) : (
      ""
    );
  };

  renderTypeForm = () => {
    return (
      <section className="choose-type_section">
        <div className="div-container_eighty-vh section_margin">
          <p className="medium-text">
            You can choose to share with <strong>text,</strong>
            <br />
            or <strong>audio.</strong>{" "}
            <span className="xtra-small-text">
              <i>(using SoundCloud)</i>
            </span>
          </p>
          <form onSubmit={(e) => this.handleShareTypeSubmit(e)}>
            <label htmlFor="type" className="small-text">
              How do you want to share?
            </label>
            <select name="share-type" id="type" className="drop-shadow">
              <option value="" selected disabled>
                Choose
              </option>
              <option value="Text">Text</option>
              <option value="Audio">Audio</option>
            </select>
            <Button buttonText="Select" buttonType="submit"></Button>
          </form>
        </div>
        {this.renderDownArrow()}
      </section>
    );
  };

  render() {
    return (
      <>
        <header className="display-none">
          <h1>Share yourself with others</h1>
        </header>
        <section>
          <div className="div-container_eighty-vh section_margin">
            <h2>Guidelines</h2>
            <p className="medium-text">
              We keep this a safe place by self monitoring
            </p>
            <p className="small-text">
              Please, when sharing, <strong>do not</strong> use names or details
              of others. Talk about <strong>your own</strong> experience.
            </p>
            <p className="small-text">Be honest and speak from your heart</p>
          </div>
        </section>
        {this.context.shareType === "None" ? (
          this.renderTypeForm()
        ) : this.context.shareType === "Text" ? (
          <ShareText cancel={this.handleCancel} />
        ) : (
          <ShareAudio cancel={this.handleCancel} />
        )}
      </>
    );
  }
}

export default Share;
