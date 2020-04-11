import React from "react";
import Button from "../../components/button/Button";
import Player from "./player/Player";
import ListenText from "./listenText/ListenText";
import StoreContext from "../../StoreContext";
import { API_ENDPOINT } from "../../config";
import "./listen.css";

class Listen extends React.Component {
  static contextType = StoreContext;

  state = {
    shareQueue: [],
    sharePosition: this.context.sharePosition,
  };

  componentDidMount() {
    this.populateShares();
  }

  renderShare = () => {
    const q = this.state.shareQueue;
    for (let i = 0; i < q.length; i++) {
      if (q[i].id === this.context.sharePosition + 1) {
        if (q[i].share_type === "Audio") {
          return <Player />;
        } else if (q[i].share_type === "Text") {
          return <ListenText />;
        }
      }
    }
  };

  populateShares = () => {
    const emotion = this.context.feeling.emotion;
    const position = this.context.sharePosition;
    const fullURL = `${API_ENDPOINT}share/find?emotion=${emotion}&position=${position}`;
    console.log(fullURL);
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
        console.log(resJson);
      });
  };

  handleNext = () => {
    this.context.updatePosition();
    console.log("handleNext ran");
  };

  render() {
    return (
      <>
        <header>
          <h1>Listen</h1>
        </header>
        <section>
          {this.state.shareQueue.length ? (
            this.renderShare()
          ) : (
            <p>shareQueue was empty</p>
          )}
        </section>
        <section>
          <Button
            buttonText="Next"
            onClick={(e) => this.handleNext(e)}
          ></Button>
          <Button buttonText="Share"></Button>
        </section>
      </>
    );
  }
}

export default Listen;
