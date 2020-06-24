import React from "react";
import Player from "./player/Player";
import ListenText from "./listenText/ListenText";
import NavButtons from "../../components/navButtons/NavButtons";
import StoreContext from "../../StoreContext";

/* This component renders previous user shares 
based on the emotion of the current user*/
class Listen extends React.Component {
  static contextType = StoreContext;

  handleNext = () => {
    this.context.updatePosition();
  };

  renderShare = () => {
    const currentShare = this.context.shareQueue[this.context.sharePosition];
    if (currentShare.share_type === "Audio") {
      return <Player share={currentShare} next={this.handleNext} />;
    } else if (currentShare.share_type === "Text") {
      return <ListenText share={currentShare} next={this.handleNext} />;
    }
  };

  render() {
    return (
      <>
        <header className="flatten">
          <h1 className="flatten transparent">Listen</h1>
        </header>
        {this.context.sharePosition <= this.context.shareQueue.length - 1 ? (
          this.renderShare()
        ) : (
          <section>
            <div className="div-container_eighty-vh section_margin">
              <h2>Looks like you've seen them all</h2>
              <p className="small-text">
                Each expression is special, and only seen once
              </p>
              <NavButtons share={true} identify={true} survey={true} />
            </div>
          </section>
        )}
      </>
    );
  }
}

export default Listen;
