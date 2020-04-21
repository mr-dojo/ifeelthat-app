import React from "react";
import Button from "../../../components/button/Button";
import { Link } from "react-router-dom";
import StoreContext from "../../../StoreContext";
import { API_ENDPOINT } from "../../../config";

export default class ShareText extends React.Component {
  static contextType = StoreContext;
  constructor(props) {
    super();
    this.state = {
      submitted: false,
      breathButtonText: "Start",
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
  }

  handleTextDelete = (e) => {
    e.preventDefault();
    this.setState({
      submitted: true,
      shareText: "",
    });
  };

  handleTextChange = (e) => {
    this.setState({
      shareText: e.target.value,
    });
  };

  handleTextSubmit = (e) => {
    e.preventDefault();
    const { id, emotion } = this.context.feeling;
    const text = this.state.shareText;
    const newShare = {
      text_share: text,
      share_type: "Text",
      feeling_id: id,
      emotion: emotion,
    };

    this.setState({
      submitted: true,
    });

    fetch(`${API_ENDPOINT}share`, {
      method: "POST",
      body: JSON.stringify(newShare),
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
      .then((resJson) => {});
  };

  handleBreathe = () => {
    document.getElementById("js-share-buttons").scrollIntoView(true);
  };

  renderInputBox = () => {
    return (
      <section>
        <h2>
          A {this.context.feeling.color} feeling of{" "}
          {this.context.feeling.emotion}
        </h2>
        <form onSubmit={this.handleTextSubmit} onChange={this.handleTextChange}>
          <label htmlFor="share-text">Express yourself below</label>
          <textarea
            type="text"
            rows="10"
            columns="30"
            name="share-text"
            id="text"
            value={this.state.shareText}
            required
          ></textarea>
          <Button buttonText="Share it" buttonType="submit"></Button>
          {!this.state.shareText ? (
            <Button buttonText="Cancel" onClick={(e) => this.props.cancel()} />
          ) : (
            <Button
              buttonText="Burn it"
              onClick={(e) => this.handleTextDelete(e)}
            ></Button>
          )}
        </form>
      </section>
    );
  };

  render() {
    return (
      <>
        {!this.state.submitted ? (
          this.renderInputBox()
        ) : (
          <section>
            <p className="small-text">
              Take another deep breath and appreciate the lightness that comes
              from expressing these feelings
            </p>
            <Button
              buttonText={this.state.breathButtonText}
              onClick={() => {
                let inCount = 5;
                let outCount = 5;
                let timer = setInterval(() => {
                  if (inCount !== 0) {
                    this.setState({
                      breathButtonText: `Breathe In ${inCount}`,
                    });
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
                      },
                      () => {
                        this.setLocalStorage();
                        this.handleBreathe();
                      }
                    );
                  }
                }, 1000);
              }}
            ></Button>
          </section>
        )}
        <section id="js-share-buttons">
          {this.state.submitted ? (
            <p className="small-text">
              Listen to others expiences of {this.context.feeling.emotion}
              <br />
              or
              <br />
              Identify a new emotion by taking a breathe
            </p>
          ) : (
            ""
          )}
          <Link className="nav-link" to="/listen">
            <Button buttonText="Listen" />
          </Link>
          <Link to="/breathe">
            <Button buttonText="Breathe" />
          </Link>
        </section>
      </>
    );
  }
}
