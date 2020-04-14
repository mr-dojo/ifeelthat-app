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
    // completeShare: {},
  };

  componentDidMount() {
    this.populateShares();
    // this.addColorToShare(this.state.shareQueue[this.state.sharePosition]);
  }

  renderShare = () => {
    const currentShare = this.state.shareQueue[this.context.sharePosition];
    console.log(currentShare);
    if (currentShare.share_type === "Audio") {
      return <Player share={currentShare} />;
    } else if (currentShare.share_type === "Text") {
      return <ListenText share={currentShare} />;
    }
  };

  populateShares = () => {
    const emotion = this.context.feeling.emotion;
    const position = this.context.sharePosition;
    const fullURL = `${API_ENDPOINT}share/find?emotion=${emotion}&position=${position}`;
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
  // addColorToShare = (item) => {
  //   const shareId = item.feeling_id;
  //   const fullURL = `${API_ENDPOINT}feeling/${shareId}`;
  //   fetch(fullURL, {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         return new Error(res.message);
  //       }
  //       return res.json();
  //     })
  //     .then((feeling) => {
  //       this.setState({ completeShare: { ...item, color: feeling.color } });
  //       return;
  //     });
  // };

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
          <Link className="nav-link" to="/share">
            <Button buttonText="Share" />
          </Link>
        </section>
      </>
    );
  }
}

export default Listen;
