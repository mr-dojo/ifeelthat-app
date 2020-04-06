import React from "react";
import Button from "../../components/button/Button";
import Player from "./player/Player";
import "./listen.css";

class Listen extends React.Component {
  render() {
    return (
      <>
        <header>
          <h1>Listen</h1>
        </header>
        <section>
          <Player />
        </section>
        <section>
          <Button buttonText="Next"></Button>
          <Button buttonText="Share"></Button>
        </section>
      </>
    );
  }
}

export default Listen;
