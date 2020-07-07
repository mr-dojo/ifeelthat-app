import React from "react";
import Button from "../../components/button/Button";
import StoreContext from "../../StoreContext";
import { Link } from "react-router-dom";
import { scroller } from "react-scroll";
import "./landing.css";

class Landing extends React.Component {
  static contextType = StoreContext;

  state = {
    onTopOfPage: true,
    arrowSection: 1,
  };

  componentDidMount() {
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
  }
  componentWillUnmount() {
    window.onscroll = null;
  }

  scrollToSection(section) {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }

  renderDownArrow = () => {
    const incrementArrowSection = (currentArrowSection) => {
      if (currentArrowSection < 7) {
        this.setState((prevState) => ({
          arrowSection: prevState.arrowSection + 1,
        }));
      } else {
        this.setState({
          arrowSection: 1,
        });
      }
    };

    return (
      <div
        className="down-arrow_container_landing-page"
        onClick={async () => {
          await incrementArrowSection(this.state.arrowSection);
          this.scrollToSection(`section-${this.state.arrowSection}`);
        }}
      >
        {this.state.onTopOfPage ? (
          <div>
            <p className="extra-small-text">Learn More</p>
          </div>
        ) : (
          ""
        )}
        {this.state.arrowSection >= 7 ? (
          <img
            className="down-arrow_landing-page rotate-180"
            src="\svg-images\noun_Arrow_circle_white_1920765.svg"
            alt="icon of arrow pointing down"
          />
        ) : (
          <img
            className="down-arrow_landing-page"
            src="\svg-images\noun_Arrow_circle_white_1920765.svg"
            alt="icon of arrow pointing down"
          />
        )}
      </div>
    );
  };

  render() {
    return (
      <>
        <div className="div-container_eighty-vh section_margin container_header">
          <header className="header_landing-page">
            <img
              className="app-logo_landing-page"
              src="/images/noun_Fingerprint_286941.png"
              alt="fingerprint"
            />
            <div className="container_header-content">
              <h1 className="app-name">AUTHENTIC</h1>
              <h2 className="tagline">
                Identify and express your emotions in a{" "}
                <span className="tagline_underline">healthy</span> way
              </h2>
            </div>
          </header>
        </div>
        {this.renderDownArrow()}
        <section className="container_dark space-evenly section-2">
          <div className="div-container_eighty-vh section_margin">
            <header>
              <img
                className="landing-page-icon"
                src="/images/noun_empathy_2295254.png"
                alt="empathy"
              />
              <h2>Connected by emotions</h2>
            </header>
            <p className="medium-text">
              This app is designed to help you find connection through shared
              experiences.
            </p>
            <p className="small-text">
              <strong>For best results:</strong>
              <br />
              Have at least 5 minutes
              <br />
              by yourself
              <br />
              in a quiet place
            </p>
          </div>
        </section>
        <section className="space-evenly section-3">
          <div className="div-container_eighty-vh section_margin">
            <header>
              <img
                className="landing-page-icon"
                src="/images/noun_emotions_black582951.png"
                alt="faces with different emotions"
              />
              <h2>Breathe and identify</h2>
            </header>
            <p className="medium-text">
              You'll go through a quick process to get out of your head and into
              your feelings.
            </p>
            <p className="small-text">
              Being mindful of your breathing will allow you to more easily
              identify and feel into the emotions you're experiencing.
            </p>
          </div>
        </section>
        <section className="container_dark space-evenly section-4">
          <div className="div-container_eighty-vh section_margin">
            <header>
              <img
                className="landing-page-icon"
                src="/images/noun_Ear_white1853757.png"
                alt="icon of an ear"
              />
              <h2>Listen to others</h2>
            </header>
            <p className="medium-text ">
              Read stories of people experiencing the same emotions as you.
            </p>
            <p className="small-text">
              You may find something you can relate to.
            </p>
          </div>
        </section>
        <section className="space-evenly section-5">
          <div className="div-container_eighty-vh section_margin">
            <header>
              <img
                className="landing-page-icon"
                src="/images/noun_speak_black1433088.png"
                alt="icon of a person speaking"
              />
              <h2>Share yourself with others</h2>
            </header>
            <p className="medium-text">
              This gives you an opportunity to anonymously express what you're
              going through.
            </p>
            <p className="small-text">
              It can be difficult, but you may feel a sense of relief when fully
              acknowledging and processing what's going on inside.
            </p>
          </div>
        </section>
        <section className="container_dark space-evenly section-6">
          <div className="div-container_eighty-vh section_margin">
            <div className="warning_container">
              <img
                className="landing-page-icon"
                src="/images/noun_Warning_white936848.png"
                alt="icon of a warning sign"
              />
              <h3>
                <strong className="medium-text">Warning:</strong>
              </h3>
              <p className="extra-small-text align-left">
                <br /> This app is not for everybody and contains adult language
                and topics that may be upsetting or disturbing.
              </p>
            </div>
            <p className="small-text">
              If at any point you feel yourself being triggered, take a deep
              breathe and <strong>reach out for help.</strong>
            </p>
            <p className="small-text">
              Use the <strong>"Safety"</strong> button at the bottom of the page
              if you are feeling like you may harm yourself or others.
            </p>
          </div>
        </section>
        <section className="section-7">
          <div className="div-container_eighty-vh section_margin">
            <header>
              <img
                className="landing-page-icon"
                src="/images/noun_Hiking_black1779379.png"
                alt="icon of a person hiking"
              />
              <h3>Start your journey...</h3>
            </header>
            <Link to="/breathe">
              <Button
                buttonText="Begin"
                onClick={() => {
                  const stepObj = { path: "/breathe", section: 1 };
                  this.context.setSessionStorage("step", stepObj);
                }}
              />
            </Link>
          </div>
        </section>
      </>
    );
  }
}

export default Landing;
