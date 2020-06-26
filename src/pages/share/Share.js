import React from "react";
import ShareText from "./shareText/ShareText";
import StoreContext from "../../StoreContext";
import { scroller } from "react-scroll";

/* Renders either a text or soundcloud iframe form based on user input */
class Share extends React.Component {
  static contextType = StoreContext;

  state = {
    onTopOfPage: true,
    shareType: "Text",
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

  render() {
    return (
      <>
        <header className="flatten">
          <h1 className="flatten transparent">Share yourself with others</h1>
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
        <ShareText />
      </>
    );
  }
}

export default Share;
