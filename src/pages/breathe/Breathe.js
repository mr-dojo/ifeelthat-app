import React from "react";
import Button from "../../components/button/Button";
import StoreContext from "../../StoreContext";
import { API_ENDPOINT } from "../../config";
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

  renderBreath = () => {
    return (
      <section className="space-evenly">
        <ScrollToTop />
        <div className="div-container_eighty-vh section_margin">
          <header>
            <img
              className="icon"
              src="/images/noun_breathe_black2588014.png"
              alt="icon of a person taking a breathe"
            />
            <h2>Breathe and Identify</h2>
          </header>

          <p className="medium-text">
            Mindful breathing will help when trying to identify your emotions.
          </p>

          <p className="small-text">
            Starting in your belly and working up to your chest, take a deep
            breath.
          </p>

          <Button
            buttonText="Start"
            onClick={() => {
              this.context.handleToggleBreatheTimer();
            }}
          />
        </div>
      </section>
    );
  };

  renderEmotion = () => {
    return (
      <section>
        <ScrollToTop />
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
              <option value="" defaultValue>
                Select One
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
        <ScrollToTop />
        <div className="section_margin space-evenly div-container_eighty-vh">
          <header>
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
          </header>

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
        <ScrollToTop />
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
            <p className="xtra-small-text">
              This may help you feel and experience your
              {this.context.feeling.emotion
                ? ` ${this.context.feeling.emotion} `
                : ` emotions `}
              at a deeper level.
            </p>
            <ColorSelector />
            <div className="quote-container">
              <p className="extra-small-text align-left quote-text">
                <i>
                  "Anyone who has ever felt blue, seen red, blacked out, or
                  turned green knows we're prone to make emotional associations
                  with different shades"
                </i>
              </p>
              <p className="extra-small-text align-right quote-author">
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

          <div className="breathe-page_button-container">
            <p className="small-text">
              Select <strong>Listen</strong> to find other people's posts about
              {this.context.feeling.emotion
                ? ` ${this.context.feeling.emotion}.`
                : ` the feeling you are experiencing.`}
            </p>

            <Button
              buttonText="Listen"
              onClick={() => {
                const stepObj = { path: "/listen" };
                this.context.setSessionStorage("step", stepObj);
                this.context.handleRedirect("/listen");
              }}
            />
          </div>

          <div className="breathe-page_button-container">
            <p className="small-text">
              Select <strong>Share</strong> to create an an anonymous post about
              {this.context.feeling.emotion
                ? ` your ${this.context.feeling.emotion}.`
                : ` the feeling you are experiencing.`}
            </p>

            <Button
              buttonText="Share"
              onClick={() => {
                const stepObj = { path: "/share" };
                this.context.setSessionStorage("step", stepObj);
                this.context.handleRedirect("/share");
              }}
            />
          </div>
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
