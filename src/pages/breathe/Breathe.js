import React from "react";
import Button from "../../components/button/Button";
import StoreContext from "../../StoreContext";
import { scroller } from "react-scroll";
import { API_ENDPOINT } from "../../config";
import { Link } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";
import "./breathe.css";
import ColorSelector from "../../components/colorSelector/ColorSelector";

/* This component takes the user through a linear progression
based on this.context.breatheSection (1-5)*/
class Breathe extends React.Component {
  static contextType = StoreContext;

  state = {
    breathButtonText: "Breathe",
    onTopOfPage: true,
  };

  componentDidMount() {
    this.watchScrollPosition();
  }

  /* If the user is on the top of the page
  render the down arrow */
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
    scroller.scrollTo("choose-color_section", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }

  handleEmotionSubmit = (e) => {
    e.preventDefault();
    const newEmotion = e.target.emotion.value;
    const stepObj = { path: "/breathe", section: 3 };

    this.context.updateFeeling(newEmotion);
    this.context.updateBreatheSection(3);
    this.context.setSessionStorage("step", stepObj);
    this.context.updatePosition(true);
    this.postFeeling(newEmotion);
  };

  postFeeling = (emotion) => {
    const newFeeling = {
      emotion: emotion,
    };

    fetch(`${API_ENDPOINT}feeling`, {
      method: "POST",
      body: JSON.stringify(newFeeling),
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
        this.context.updateFeeling(resJson);
      });
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

  renderBreath = () => {
    return (
      <section className="space-evenly">
        <div className="div-container_eighty-vh section_margin">
          <img
            className="icon"
            src="/images/noun_breathe_black2588014.png"
            alt="icon of a person taking a breathe"
          />
          <h2>Breathe and Identify</h2>

          <p className="small-text">
            Starting in your belly and working up to your chest, take a deep
            breath.
          </p>

          <Button
            buttonText={this.state.breathButtonText}
            onClick={() => {
              let inCount = 5;
              let outCount = 5;
              let timer = setInterval(() => {
                if (inCount !== 0) {
                  this.setState({ breathButtonText: `Breathe In ${inCount}` });
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
                      breathButtonText: "Breathe",
                    },
                    () => {
                      this.context.updateBreatheSection(2);
                      const stepObj = { path: "/breathe", section: 2 };
                      this.context.setSessionStorage("step", stepObj);
                    }
                  );
                }
              }, 1000);
            }}
          ></Button>
          <p className="small-text">
            Mindful breathing will help when trying to identify your emotions.
          </p>
        </div>
      </section>
    );
  };

  renderEmotion = () => {
    return (
      <section>
        <div className="section_margin div-container_eighty-vh">
          <header>
            <img
              className="icon"
              src="/images/noun_emotions_black582951.png"
              alt="faces with different emotions"
            />
            <h2>Notice how you're feeling</h2>
          </header>
          <p className="medium-text">Can you name the strongest emotion?</p>
          <form
            className="claim-emotion"
            onSubmit={(e) => this.handleEmotionSubmit(e)}
          >
            <label htmlFor="emotion" aria-label="choose emotion"></label>
            <select
              type="text"
              name="claim-emotion"
              className="drop-shadow"
              id="emotion"
              required
            >
              <option value="" selected disabled>
                Select
              </option>
              <option value="Joy">Joy</option>
              <option value="Sadness">Sadness</option>
              <option value="Fear">Fear</option>
              <option value="Anger">Anger</option>
              <option value="Anxiety">Anxiety</option>
              <option value="Excitement">Excitement</option>
              <option value="Guilt">Guilt</option>
              <option value="Gratitude">Gratitude</option>
              <option value="Contentment">Contentment</option>
              <option value="Shame">Shame</option>
              <option value="Loneliness">Loneliness</option>
              <option value="Pride">Pride</option>
              <option value="Confusion">Confusion</option>
              <option value="Power">Power</option>
              <option value="Disappointment">Disappointment</option>
              <option value="Nothing">Nothing</option>
            </select>
            <Button buttonText="Save" buttonType="submit"></Button>
          </form>
        </div>
      </section>
    );
  };

  renderBreath2 = () => {
    return (
      <section id="breathe-again" className="section_margin space-evenly">
        <div className="section_margin space-evenly div-container_eighty-vh">
          <img
            className="icon"
            src="/images/noun_breathe_black2588014.png"
            alt="icon of a person taking a breathe"
          />
          <h2>
            Feel that
            {this.context.feeling.emotion
              ? ` ${this.context.feeling.emotion}`
              : ` emotion`}
          </h2>
          <p className="small-text">
            Take a few more deep breaths and try to <strong>really</strong>{" "}
            experience it.
          </p>
          <Button
            buttonText={this.state.breathButtonText}
            onClick={() => {
              let inCount = 5;
              let outCount = 5;
              let timer = setInterval(() => {
                if (inCount !== 0) {
                  this.setState({ breathButtonText: `Breathe In ${inCount}` });
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
                      breathButtonText: "Breathe",
                    },
                    () => {
                      const stepObj = { path: "./breathe", section: 4 };
                      this.context.updateBreatheSection(4);
                      this.context.setSessionStorage("step", stepObj);
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

  renderColor = () => {
    return (
      <>
        <section className="container-dark explain-color_section">
          <div className="div-container_eighty-vh">
            <header>
              <img
                className="icon"
                src="/images/noun_choose_black1197910.png"
                alt="finger hovering over buttons"
              />
              <h2 className="explain-color_h2">
                Choose a color to represent
                {this.context.feeling.emotion
                  ? ` your ${this.context.feeling.emotion}`
                  : ` this emotion`}
                .
              </h2>
            </header>
            <p className="small-text">
              This may help you feel and experience your
              {this.context.feeling.emotion
                ? ` ${this.context.feeling.emotion} `
                : ` emotions `}
              at a deeper level.
            </p>
          </div>
        </section>
        {this.renderDownArrow()}
        <section className="choose-color_section">
          <div className="div-container_eighty-vh">
            <ColorSelector />
            <div className="quote-container">
              <p className="xtra-small-text align-left quote-text">
                <i>
                  "Anyone who has ever felt blue, seen red, blacked out, or
                  turned green knows we're prone to make emotional associations
                  with different shades"
                </i>
              </p>
              <p className="xtra-small-text align-right quote-author">
                - Winifred Gallagher
              </p>
            </div>
          </div>
        </section>
      </>
    );
  };

  renderButtons = () => {
    return (
      <section id="breathe-buttons">
        <div className="div-container_eighty-vh section_margin">
          <ScrollToTop />
          <header>
            <h2>
              {this.context.feeling.emotion
                ? `Feeling of ${this.context.feeling.emotion}`
                : `You've identified your emotion, now...`}
            </h2>
          </header>
          <p className="medium-text">
            Select <strong>Listen</strong> to find other people's posts about
            {this.context.feeling.emotion
              ? ` their ${this.context.feeling.emotion}.`
              : ` the feeling you are experiencing.`}
            .
          </p>
          <Link className="nav-link" to="/listen">
            <Button
              buttonText="Listen"
              onClick={() => {
                const stepObj = { path: "/listen" };
                this.context.setSessionStorage("step", stepObj);
              }}
            />
          </Link>
          <p className="medium-text">
            Select <strong>Share</strong> to create an an anonymous post about
            {this.context.feeling.emotion
              ? ` your ${this.context.feeling.emotion}.`
              : ` the feeling you are experiencing.`}
          </p>
          <Link className="nav-link" to="/share">
            <Button
              buttonText="Share"
              onClick={() => {
                const stepObj = { path: "/share" };
                this.context.setSessionStorage("step", stepObj);
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
        <header roll="header" className="flatten">
          <h1 className="transparent flatten" aria-label="Identify emotions">
            Breathe
          </h1>
        </header>
        {this.context.breatheSection === 1 ? this.renderBreath() : ""}
        {this.context.breatheSection === 2 ? this.renderEmotion() : ""}
        {this.context.breatheSection === 3 ? this.renderBreath2() : ""}
        {this.context.breatheSection === 4 ? this.renderColor() : ""}
        {this.context.breatheSection === 5 ? this.renderButtons() : ""}
      </>
    );
  }
}

export default Breathe;
