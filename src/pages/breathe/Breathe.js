import React from "react";
import Button from "../../components/button/Button";
import StoreContext from "../../StoreContext";
import { API_ENDPOINT } from "../../config";
import { Link } from "react-router-dom";
import "./breathe.css";

class Breathe extends React.Component {
  static contextType = StoreContext;

  state = {
    section: 1,
    emotion: "",
    color: "",
    breathButtonText: "Start",
  };

  componentDidMount() {
    if (window.localStorage.getItem("step")) {
      const step = window.localStorage.getItem("step");
      const stepObj = JSON.parse(step);
      if (stepObj.path !== "/breathe") {
        window.localStorage.setItem(
          "step",
          JSON.stringify({
            path: "/breathe",
            section: 1,
          })
        );
      } else {
        this.setState({
          emotion: this.context.feeling.emotion,
          color: this.context.feeling.color,
          section: stepObj.section,
        });
      }
    } else {
      this.setLocalStorage();
    }
  }

  setLocalStorage = () => {
    window.localStorage.setItem(
      "step",
      JSON.stringify({
        path: "/breathe",
        section: this.state.section,
      })
    );
  };

  handleEmotionSubmit = (e) => {
    e.preventDefault();
    const newEmotion = e.target.emotion.value;

    this.context.updatePosition(true);

    this.setState({ section: 3, emotion: newEmotion }, () => {
      postFeeling();
      this.setLocalStorage();
    });

    const postFeeling = () => {
      const newFeeling = {
        emotion: this.state.emotion,
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
  };

  handleColorSubmit = (e) => {
    e.preventDefault();
    this.setState({ section: 5, color: e.target.color.value }, () => {
      patchColor();
      this.setLocalStorage();
    });

    const patchColor = () => {
      const newColor = {
        emotion: this.state.emotion,
        color: this.state.color,
      };

      fetch(`${API_ENDPOINT}feeling/${this.context.feeling.id}`, {
        method: "PATCH",
        body: JSON.stringify(newColor),
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
  };

  renderBreath = () => {
    return (
      <section>
        <h2>
          Let's start out by taking a breath and allowing yourself to feel
        </h2>

        <p className="small-text">
          From your belly
          <br /> Working up to your chest
          <br /> take a deep breath
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
                    breathButtonText: "Start",
                    section: 2,
                  },
                  () => {
                    this.setLocalStorage();
                  }
                );
              }
            }, 1000);
          }}
        ></Button>
        <p className="small-text">
          Mindful breathing will help you identify your emotions
        </p>
      </section>
    );
  };

  renderEmotion = () => {
    return (
      <section>
        <form
          className="claim-emotion"
          onSubmit={(e) => this.handleEmotionSubmit(e)}
        >
          <label htmlFor="claim-emotion">
            What feeling is alive in you right now? What emotion are you
            experiencing?
          </label>
          <select type="text" name="claim-emotion" id="emotion" required>
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
      </section>
    );
  };

  renderBreath2 = () => {
    return (
      <section id="breathe-again">
        <p className="small-text">
          Take another deep breath and try to really feel that emotion for a
          moment...
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
                    breathButtonText: "Start",
                    section: 4,
                  },
                  () => {
                    this.setLocalStorage();
                  }
                );
              }
            }, 1000);
          }}
        ></Button>
      </section>
    );
  };

  renderColor = () => {
    return (
      <>
        <section className="container-dark explain-color_section">
          <div className="explain-color_div">
            <h2 className="explain-color_h2 align-left">
              Choose a color to represent your emotion.
            </h2>
            <p className="medium-text align-left">
              By giving our emotion a color, it allows us to separate from it.
              This helps us see our emotion as something we are{" "}
              <strong>experiencing</strong> rather than something we{" "}
              <strong>are</strong>
            </p>
          </div>
        </section>
        <section className="color_section">
          <form onSubmit={(e) => this.handleColorSubmit(e)}>
            <label htmlFor="select-color medium-text">
              If you had to give your feeling of "{this.context.feeling.emotion}
              " a color
              <br />
              what would it be?
            </label>
            <select type="text" name="select-color" id="color" required>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Grey">Grey</option>
              <option value="Red">Red</option>
              <option value="Pink">Pink</option>
              <option value="Orange">Orange</option>
              <option value="Yellow">Yellow</option>
              <option value="Green">Green</option>
              <option value="Blue">Blue</option>
              <option value="Purple">Purple</option>
              <option value="Other">*more to come*</option>
            </select>
            <Button buttonText="Save" buttonType="submit"></Button>
          </form>
          <div className="quote-container">
            <p className="xtra-small-text align-left quote-text">
              <i>
                "Anyone who has ever felt blue, seen red, blacked out, or turned
                green knows we're prone to make emotional associations with
                different shades"
              </i>
            </p>
            <p className="xtra-small-text align-right quote-author">
              - Winifred Gallagher
            </p>
          </div>
        </section>
      </>
    );
  };

  renderButtons = () => {
    return (
      <section id="breathe-buttons">
        <p className="medium-text">
          {this.state.color} feeling of {this.state.emotion}
        </p>
        <Link className="nav-link" to="/listen">
          <Button buttonText="Listen" />
        </Link>
        <Link className="nav-link" to="/share">
          <Button buttonText="Share" />
        </Link>
      </section>
    );
  };

  render() {
    return (
      <>
        <header roll="header" className="breathe-header">
          <h1 aria-label="Identify emotions">Breathe</h1>
        </header>
        {this.state.section === 1 ? this.renderBreath() : ""}
        {this.state.section === 2 ? this.renderEmotion() : ""}
        {this.state.section === 3 ? this.renderBreath2() : ""}
        {this.state.section === 4 ? this.renderColor() : ""}
        {this.state.section === 5 ? this.renderButtons() : ""}
      </>
    );
  }
}

export default Breathe;
