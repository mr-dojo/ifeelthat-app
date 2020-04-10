import React from "react";
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";

function Landing(props) {
  return (
    <>
      <header role="banner">
        <h1>Listen and Share</h1>
        <p>In the age of Social Media we are more dissconnected than ever</p>
        <h2>
          Express yourself anonymously with no profiles, no likes, no followers
        </h2>
      </header>
      <section>
        <p>
          This app is designed to help you process your emotions and empathise
          with others
        </p>
        <p>First you will feel into your body and breathe</p>
        <p>Then you'll identify what you're feeling</p>
        <p>
          Next, You will get to listen to others express feelings similar to
          yours
        </p>
        <p>
          Lastly, you'll have the option to share your emotional experiences
          with other humans
        </p>
      </section>
      <section>
        <header>
          <h3>Identify what you're feeling</h3>
        </header>
        <p>
          You'll go through a process to move into your physical body and get
          out of your head
        </p>
        <p>
          Being present in your body allows you to get in touch with the
          feelings you are experiencing
        </p>
      </section>
      <section>
        <header>
          <h3>Listen to humans that are experiencing similar feelings</h3>
        </header>
        <p>
          Find videos and stories of people experiencing and expressing their
          emotions
        </p>
        <p>You may hear/read something you can relate to</p>
      </section>
      <section>
        <header>
          <h3>Share your emotional experiences with other humans</h3>
        </header>
        <p>
          This gives you an opportunity to anonymously voice your emotional
          experiences
        </p>
        <p>In my experience, it can be a difficult thing to do</p>
        <p>
          For me, I get a sense of relief when I fully acknowledge and express
          what's going on inside
        </p>
      </section>
      <section>
        <p>
          Warning: This app is not for everybody. It contains content that may
          be disturbing and upsetting
        </p>
        <p>
          If at any point you feel yourself being triggered, take a deep breathe
          and reach out for help
        </p>
        <p>
          Use the "Saftey" button if you are feeling like you may harm yourself
        </p>
      </section>
      <section>
        <header>
          <h3>Begin</h3>
        </header>
        <Link to="/breathe">
          <Button buttonText="Start your journey" />
        </Link>
      </section>
    </>
  );
}

export default Landing;
