import React from "react";
import Button from "../../components/button/Button";
import Player from "./player/Player";
import ListenText from "./listenText/ListenText";
import StoreContext from "../../StoreContext";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "../../config";
import "./listen.css";

class Listen extends React.Component {
  static contextType = StoreContext;

  state = {
    shareQueue: [],
    localEmotion: null,
    localPosition: null,
  };

  componentDidMount() {
    if (window.localStorage.getItem("step")) {
      const step = window.localStorage.getItem("step");
      const stepObj = JSON.parse(step);

      if (stepObj.path !== "/listen") {
        this.setLocalStorage();
        this.populateShares();
      } else {
        const localStorageFeeling = window.localStorage.getItem("feeling");
        const feelingObj = JSON.parse(localStorageFeeling);
        const localStoragePosition = window.localStorage.getItem(
          feelingObj.emotion
        );
        this.populateShares(feelingObj.emotion);
        this.context.setPositionFromLocalStorage(localStoragePosition);
      }
    } else {
      this.setLocalStorage();
      this.populateShares();
    }
  }

  setLocalStorage = () => {
    window.localStorage.setItem(
      "step",
      JSON.stringify({
        path: "/listen",
      })
    );
    window.localStorage.setItem(
      this.context.feeling.emotion,
      this.context.sharePosition
    );
  };

  renderShare = () => {
    const currentShare = this.state.shareQueue[this.context.sharePosition];
    if (currentShare.share_type === "Audio") {
      return <Player share={currentShare} next={this.handleNext} />;
    } else if (currentShare.share_type === "Text") {
      return <ListenText share={currentShare} next={this.handleNext} />;
    }
  };

  populateShares = (localStorageEmotion) => {
    const emotion = localStorageEmotion || this.context.feeling.emotion;
    const fullURL = `${API_ENDPOINT}share/find?emotion=${emotion}`;
    fetch(fullURL, {
      method: "GET",
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
        this.setState({
          shareQueue: resJson,
        });
      })
      .catch();
  };

  handleNext = () => {
    this.context.updatePosition();
  };

  render() {
    return (
      <>
        <header>
          <h1>Listen</h1>
        </header>
        <section>
          {this.context.sharePosition <= this.state.shareQueue.length - 1 ? (
            this.renderShare()
          ) : (
            <>
              <h2>Looks like you've seen them all</h2>
              <p>Each expression is special, and only seen once per session</p>
              <Link to="/share">
                <Button buttonText="Share" />
              </Link>
              <Link to="/breathe">
                <Button buttonText="Breathe" />
              </Link>
            </>
          )}
        </section>
      </>
    );
  }
}

export default Listen;
