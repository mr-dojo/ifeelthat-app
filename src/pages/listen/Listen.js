import React from "react";
import Button from "../../components/button/Button";

class Listen extends React.Component {
  render() {
    return (
      <>
        <header>
          <h1>Listen</h1>
        </header>
        <section>
          <p>
            - This section re-states the emotions that the listener was feeling
          </p>
          <p>
            - Displays the intention of the person sharing the text/audio/video
          </p>
        </section>
        <section>
          <p>
            This is a placeholder for a conditionally rendering div that will
            display either text, video, or audio.
          </p>
        </section>
        <section>
          <Button buttonText="Share"></Button>
          <Button buttonText="Next"></Button>
        </section>
      </>
    );
  }
}

export default Listen;
