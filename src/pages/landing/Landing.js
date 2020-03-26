import React from "react";
import Button from "../../components/button/Button";

function Landing(props) {
  return (
    <>
      <header role="banner">
        <h1>Listen and Share</h1>
        <p>In the age of Social Media we are more dissconnected than ever.</p>
        <h2>
          This is a place to express yourself anonymously with no profiles, no
          likes, no followers
        </h2>
      </header>
      <section>
        <header>
          <h3>Identify what you're feeling</h3>
        </header>
        <p>
          You'll go through a process to move into your physical body and get
          out of your head.
        </p>
        <p>
          Being present in your body allows you to get in touch with the
          feelings you are experiencing
        </p>
      </section>
      <section>
        <header>
          <h3>Listen to humans that are going through similar things</h3>
        </header>
        <p>
          Find videos and stories of people experiencing and expressing their
          emotions.
        </p>
        <p>You may hear/read something you can relate to.</p>
      </section>
      <section>
        <header>
          <h3>Share your emotional experiences with other humans</h3>
        </header>
        <p>It's a very scary thing to do. (or at least it is for me)</p>
        <p>
          This gives you an opportunity to anonymously voice your emotional
          experiences.
        </p>
        <p>
          I know for me, I get a sense of relief when I fully acknowledge and
          express what's going on inside.
        </p>
      </section>
      <section>
        <h2>Guidelines</h2>
        <p>We keep this a safe space by self monitoring.</p>
        <p>Please, when sharing, do not use names or details of others.</p>
        <p>Speak only to your own experience.</p>
      </section>
      <section>
        <p>
          Warning: This app is not for everybody. It contains content that may
          be disturbing and upsetting. If at any point you feel yourself being
          triggered, take a deep breathe and reach out for help
        </p>
        <p>
          Use the "Saftey" button if you are feeling like you may harm yourself.
        </p>
      </section>
      <section>
        <h3>Begin</h3>
        <Button buttonText="Start your journey"></Button>
      </section>
    </>
  );
}

export default Landing;
