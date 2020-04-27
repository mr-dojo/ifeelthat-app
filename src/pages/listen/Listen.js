import React from "react";
import Button from "../../components/button/Button";
import Player from "./player/Player";
import ListenText from "./listenText/ListenText";
import StoreContext from "../../StoreContext";
import { Link } from "react-router-dom";
import "./listen.css";

class Listen extends React.Component {
  static contextType = StoreContext;

  renderShare = () => {
    const currentShare = this.context.shareQueue[this.context.sharePosition];
    if (currentShare.share_type === "Audio") {
      return <Player share={currentShare} next={this.handleNext} />;
    } else if (currentShare.share_type === "Text") {
      return <ListenText share={currentShare} next={this.handleNext} />;
    }
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
          {this.context.sharePosition <= this.context.shareQueue.length - 1 ? (
            this.renderShare()
          ) : (
            <>
              <h2>Looks like you've seen them all</h2>
              <p>Each expression is special, and only seen once</p>
              <Link to="/share">
                <Button
                  buttonText="Share"
                  onClick={() => {
                    const stepObj = { path: "/share" };
                    this.context.setSessionStorage("step", stepObj);
                  }}
                />
              </Link>
              <Link to="/breathe">
                <Button
                  buttonText="Breathe"
                  onClick={() => {
                    const stepObj = { path: "/breathe", section: 1 };
                    this.context.setSessionStorage("step", stepObj);
                  }}
                />
              </Link>
            </>
          )}
        </section>
      </>
    );
  }
}

export default Listen;
