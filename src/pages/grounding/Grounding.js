import React from "react";
import Button from "../../components/button/Button";
import StoreContext from "../../StoreContext";
import { API_ENDPOINT } from "../../config";
import { Link } from "react-router-dom";

class Grounding extends React.Component {
  static contextType = StoreContext;

  state = {
    section: 1,
    emotion: "",
    color: "",
    breathButtonText: "Breathe",
  };

  handleEmotionSubmit = (e) => {
    e.preventDefault();
    const newEmotion = e.target.emotion.value;

    this.context.updatePosition(true);

    this.setState({ section: 3, emotion: newEmotion }, () => {
      postFeeling();
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
        <p>
          From your belly and working up to your chest, take a deep breath...
        </p>
        <Button
          buttonText={this.state.breathButtonText}
          onClick={() => {
            let inCount = 5;
            let outCount = 5;
            let timer = setInterval(() => {
              if (inCount !== 0) {
                this.setState({ breathButtonText: `In ${inCount}` });
                inCount = inCount - 1;
              } else if (outCount !== 0) {
                this.setState({
                  breathButtonText: `Out ${outCount}`,
                });
                outCount--;
              } else {
                clearInterval(timer);
                return this.setState({
                  breathButtonText: "Breathe",
                  section: 2,
                });
              }
            }, 1000);
          }}
        ></Button>
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
          </select>
          <Button buttonText="Save" buttonType="submit"></Button>
        </form>
      </section>
    );
  };

  renderBreath2 = () => {
    return (
      <section id="breathe-again">
        <p>
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
                this.setState({ breathButtonText: `In ${inCount}` });
                inCount = inCount - 1;
              } else if (outCount !== 0) {
                this.setState({
                  breathButtonText: `Out ${outCount}`,
                });
                outCount--;
              } else {
                clearInterval(timer);
                return this.setState({
                  breathButtonText: "Breathe",
                  section: 4,
                });
              }
            }, 1000);
          }}
        ></Button>
      </section>
    );
  };

  renderColor = () => {
    return (
      <section>
        <form onSubmit={(e) => this.handleColorSubmit(e)}>
          <label htmlFor="name-color">
            What color would you associate with that feeling?
          </label>
          <select type="text" name="name-color" id="color" required>
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
      </section>
    );
  };

  renderButtons = () => {
    return (
      <section id="grounding-buttons">
        <p className="feeling-paragraph">
          A {this.state.color} feeling of {this.state.emotion}
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
        <header>
          <h1>Grounding</h1>
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

export default Grounding;
