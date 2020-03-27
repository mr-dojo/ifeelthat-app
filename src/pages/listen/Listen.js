import React from "react";
import Button from "../../components/button/Button";
import "./listen.css";

class Listen extends React.Component {
  render() {
    return (
      <>
        <header>
          <h1>Listen</h1>
        </header>
        <section>
          <h2>A black feeling of anxiety</h2>
          <p className="share-text">Quarantine.</p>
          <p className="share-text">
            I've been in a house with my family for two
            weeks straight has me feeling stressed out and anxious.
          </p>
          <p className="share-text">
            Tentions are running high and my desire is to fix it.
          </p>
          <p className="share-text">
            I am a peace-keeper and I am feeling like I'm not in control.
          </p>
          <p className="share-text">
            Not in control of anything in my life right now.
          </p>
          <p className="share-text">
            Although I'm getting help, I feel like the
            responsiblities of the house fall on my shoulders.
          </p>
          <p className="share-text">Is that true?</p>
          <p className="share-text">
            Do all of these responsibilities fall on me?
          </p>
          <p className="share-text">If not, what is true?</p>
          <p className="share-text">
            It's hard for me to tell while I still feel this black feeling in my
            stomach.
          </p>
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
