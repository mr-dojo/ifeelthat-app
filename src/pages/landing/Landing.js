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
              Identify and express your emotions in a <strong>healthy</strong>{" "}
              way
            </h2>
          </div>
        </header>
        {this.renderDownArrow()}
        <section id="section-one_landing-page">
          <h2>
            Express yourself anonymously with no profiles, no likes, no
            followers
          </h2>
          <p className="medium-text">
            In the age of Social Media we are more dissconected than ever
          </p>
          <p className="small-text">This app aims to change that</p>
        </section>
        <section>
          <p className="medium-text">
            This app is designed to help you process your emotions and empathise
            with others
          </p>
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
        </section>
        <section>
          <header>
            <h3>Identify what you're feeling</h3>
          </header>
          <p className="small-text">
            You'll go through a process to move into your physical body and get
            out of your head
          </p>
          <p className="small-text">
            Being present in your body allows you to get in touch with the
            feelings you are experiencing
          </p>
        </section>
        <section>
          <header>
            <h3>Listen to humans that are experiencing similar feelings</h3>
          </header>
          <p className="small-text">
            Find videos and stories of people experiencing and expressing their
            emotions
          </p>
          <p className="small-text">
            You may hear/read something you can relate to
          </p>
        </section>
        <section>
          <header>
            <h3>Share your emotional experiences with other humans</h3>
          </header>
          <p className="small-text">
            This gives you an opportunity to anonymously voice your emotional
            experiences
          </p>
          <p className="small-text">
            In my experience, it can be a difficult thing to do
          </p>
          <p className="small-text">
            For me, I get a sense of relief when I fully acknowledge and express
            what's going on inside
          </p>
        </section>
        <section>
          <p className="medium-text">
            Warning:
            <br /> This app is not for everybody. It contains content that may
            be disturbing and upsetting
          </p>
          <p className="small-text">
            If at any point you feel yourself being triggered, take a deep
            breathe and <strong>reach out for help</strong>
          </p>
          <p className="small-text">
            Use the <bold>"Safety"</bold> button if you are feeling like you may
            harm yourself
          </p>
        </section>
        <section>
          <header>
            <h3>Start your journey</h3>
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
