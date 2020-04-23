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
    if (window.sessionStorage.getItem("step")) {
      const stepObj = { path: "/listen" };
      // set session storage
      this.context.setSessionStorage("step", stepObj);
      // get feeling from session storage
      const feelingString = window.sessionStorage.getItem("feeling");
      const feelingObj = JSON.parse(feelingString);
      // update feeling
      this.context.updateFeeling(feelingObj);
      // get position from local storage
      const localStoragePosition = window.localStorage.getItem(
        feelingObj.emotion
      );
      // update sharePosition in context
      this.context.setPositionFromLocalStorage(localStoragePosition);
      this.populateShares();
    } else {
      this.context.handleRedirect("/");
    }
  }

  renderShare = () => {
    const currentShare = this.state.shareQueue[this.context.sharePosition];
    if (currentShare.share_type === "Audio") {
      return <Player share={currentShare} next={this.handleNext} />;
    } else if (currentShare.share_type === "Text") {
      return <ListenText share={currentShare} next={this.handleNext} />;
    }
  };

  populateShares = () => {
    const emotion = this.context.feeling.emotion;
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
        <header className="flatten push-off-page">
          <h1>Listen and Read</h1>
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
