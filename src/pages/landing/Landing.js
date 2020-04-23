import React from "react";
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";
import "./landing.css";

class Landing extends React.Component {
  state = {
    onTopOfPage: true,
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

  renderDownArrow = () => {
    return this.state.onTopOfPage ? (
      <div
        className="down-arrow_container_landing-page"
        onClick={() =>
          document
            .getElementById("section-one_landing-page")
            .scrollIntoView(true)
        }
      >
        <img
          className="down-arrow_landing-page"
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
        <header className="header_landing-page" role="banner">
          <img
            className="app-logo_landing-page"
            src="/images/brain_Plus_Heart_Black.png"
            alt="icons of a brain, a plus sign and a heart"
          />
          <div>
            <h1 className="app-name">AUTHENTIC</h1>
            <h2 className="tagline">
              Identify and express your emotions in a{" "}
              <span className="tagline_underline">healthy</span> way
            </h2>
          </div>
        </header>
        {this.renderDownArrow()}
        <section
          id="section-one_landing-page"
          className="container_dark space-evenly"
        >
          <header>
            <h2 className="align-left">
              In an age of Social Media and instant communication,
              <br /> we are more dissconected than ever.
            </h2>
          </header>
          <p className="medium-text">
            This app is designed to help you find connection through shared
            experiences.
          </p>
        </section>
        <section className="space-evenly">
          <header>
            <h2>Breathe and Identify</h2>
          </header>
          <p className="small-text">
            You'll go through a 3 minute process to get out of your head and
            into your feelings.
          </p>
          <p className="small-text">
            Being mindful of your breathing will allow you to more easily
            identify the emotions you're experiencing.
          </p>
        </section>
        <section className="container_dark space-evenly">
          <header>
            <h2>Read and Listen</h2>
          </header>
          <p className="small-text ">
            Hear and read stories of people experiencing the same emotions as
            you.
          </p>
          <p className="small-text">
            You may find something you can relate to.
          </p>
        </section>
        <section className="space-evenly">
          <header>
            <h2>Share yourself with others</h2>
          </header>
          <p className="small-text">
            This gives you an opportunity to anonymously voice what you're going
            through.
          </p>
          <p className="small-text">
            You may feel a sense of relief when fully acknowledging and
            expressing what's going on inside.
          </p>
          <p className="small-text">It can be difficult, but rewarding.</p>
        </section>
        <section className="container_dark space-evenly">
          <div className="warning_container">
            <h3>
              <strong className="medium-text">Warning:</strong>
            </h3>
            <p className="small-text">
              <br /> This app is not for everybody and contains content that may
              be disturbing and upsetting.
            </p>
            <p className="small-text">
              May also contain adult language and topics.
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
        </section>
        <section>
          <header>
            <h3>Start your journey...</h3>
          </header>
          <Link to="/breathe">
            <Button buttonText="Begin" />
          </Link>
        </section>
      </>
    );
  }
}

export default Landing;
