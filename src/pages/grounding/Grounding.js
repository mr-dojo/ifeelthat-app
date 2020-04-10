import React from "react";
import Button from "../../components/button/Button";
import { API_ENDPOINT } from "../../config";
import { Link } from "react-router-dom";

class Grounding extends React.Component {
  state = {
    emotion: "",
    color: "",
  };

  handleEmotionSubmit = (e) => {
    e.preventDefault();
    this.setState({ emotion: e.target.emotion.value });
    document.getElementById("breathe-again").scrollIntoView(true);
  };

  handleColorSubmit = (e) => {
    e.preventDefault();
    this.setState({ color: e.target.color.value }, () => {
      postFeeling();
    });

    const postFeeling = () => {
      document.getElementById("grounding-buttons").scrollIntoView(true);

      const newFeeling = {
        emotion: this.state.emotion,
        color: this.state.color,
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
          console.log(resJson);
        });
    };
  };

  render() {
    return (
      <>
        <header>
          <h1>Grounding</h1>
        </header>
        <section>
          <p>
            From your belly and working up to your chest, take a deep breath...
          </p>
        </section>
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
        <section id="breathe-again">
          <p>
            Take another deep breath and try to really feel that emotion for a
            moment...
          </p>
        </section>
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
        <section id="grounding-buttons">
          <Button buttonText="Go Deeper" />
          <Link className="nav-link" to="/listen">
            <Button buttonText="Listen" />
          </Link>
          <Link className="nav-link" to="/share">
            <Button buttonText="Share" />
          </Link>
        </section>
      </>
    );
  }
}

export default Grounding;
