import React from "react";
import Button from "../../components/button/Button";

function Landing(props) {
  return (
    <>
      <header role="banner">
        <h1>Listen and Share</h1>
        <h2>
          A place to express yourself anonymusly with no profiles, no likes, no
          followers
        </h2>
        <p>
          Personal message about I created this and what I want people to get
          out of it
        </p>
      </header>
      <section>
        <header>
          <h3>First, emotional awareness</h3>
        </header>
        <p>
          [<em>placeholder for quotes and information about grounding</em>]
        </p>
        <p>
          You'll go through a process to move into your physical body and get
          out of your head. Being present in your body allows you to get in
          touch with the feelings you are experiencing
        </p>
      </section>
      <section>
        <header>
          <h3>Listen to others</h3>
        </header>
        <p>
          [
          <em>
            placeholder for quotes and info about the importance of listening
          </em>
          ]
        </p>
        <p>
          Find videos and stories of people experiencing and expressing emotions
          simmilar to yours.
        </p>
      </section>
      <section>
        <header>
          <h3>Share yourself</h3>
        </header>
        <p>
          [
          <em>
            placeholder for quotes and info about the benefits of vulnerability
            and sharing with others
          </em>
          ]
        </p>
        <p>
          Optional, this gives you an opportunity to voice your emotional
          experiences. In doing so, feel the relief/inner space that is created
          when fully agnolaging and expressing whats going on inside.
        </p>
      </section>
      <section>
        <h2>Guidelines about the app in general</h2>
      </section>
      <section>
        <p>
          Warning: This app is not for everybody. It contains content that may
          be disturbing and upsetting. If at any point you feel yourself being
          triggered, take a breath starting in your belly and reach out for help
        </p>
        <header>
          <h3>Take a deep breath, from your belly...</h3>
        </header>
      </section>
      <section>
        <h3>Begin</h3>
        <Button buttonText="Start your journey"></Button>
      </section>
    </>
  );
}

export default Landing;
