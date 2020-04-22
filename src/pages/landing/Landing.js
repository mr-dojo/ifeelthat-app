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
              Identify and express your emotions
              <br /> in a <strong>healthy</strong> way
            </h2>
          </div>
        </header>
        {this.renderDownArrow()}
        <section
          id="section-one_landing-page"
          className="container_dark space-evenly"
        >
          <h2>
            In an age of Social Media and instant communication, we are more
            dissconected than ever
          </h2>
          <p className="medium-text">
            This app is designed to help you process your emotions and feel
            connection with others
          </p>
        </section>
        {/* <section>
          <ul>
            <li>
              <p className="small-text">
                First you will feel into your body and breathe
              </p>
            </li>
            <li>
              <p className="small-text">
                Then you'll identify what you're feeling
              </p>
            </li>
            <li>
              <p className="small-text">
                Next, You will get to listen to others express feelings similar
                to yours
              </p>
            </li>
            <li>
              <p className="small-text">
                Lastly, you'll have the option to share your emotional
                experiences with other humans
              </p>
            </li>
          </ul>
        </section> */}
        <section className="space-evenly">
          <header>
            <h2>Breathe and Identify</h2>
          </header>
          <p className="medium-text">
            You'll go through a 3 minute process to get out of your head and
            into your feelings.
          </p>
          <p className="small-text">
            Being mindful of your breathing will allow you to more easily
            identify the emotions you are experiencing.
          </p>
        </section>
        <section className="container_dark space-evenly">
          <header>
            <h3>Read about and listen to people expressing their emotions</h3>
          </header>
          <p className="small-text">
            Find audio and stories of people experiencing the same emotion as
            you
          </p>
          <p className="small-text">
            You may hear/read something you can relate to
          </p>
        </section>
        <section className="space-evenly">
          <header>
            <h3>Share yourself with others</h3>
          </header>
          <p className="small-text">
            This gives you an opportunity to anonymously voice what you're going
            through
          </p>
          <p className="small-text">
            It can be a difficult, but rewarding thing to do
          </p>
          <p className="small-text">
            You may feel a sense of relief when fully acknowledging and
            expressing what's going on inside
          </p>
        </section>
        <section className="container_dark space-evenly">
          <div className="warning_container">
            <strong className="medium-text">Warning:</strong>
            <p className="small-text align-left">
              <br /> This app is not for everybody and contains content that may
              be disturbing / upsetting
            </p>
            <p className="small-text align-left">
              May also contain adult language and topics
            </p>
          </div>
          <p className="small-text">
            If at any point you feel yourself being triggered, take a deep
            breathe and <strong>reach out for help</strong>
          </p>
          <p className="small-text">
            Use the "Safety" button if you are feeling like you may harm
            yourself or others
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
