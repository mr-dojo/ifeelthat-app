import React from "react";
import Button from "../../components/button/Button";

class Grounding extends React.Component {
  render() {
    return (
      <>
        <header>
          <h1>Grounding</h1>
        </header>
        <section>
          <p>
            From your belly and working up to your chest, take a deep breath...
          </p>
        </section>
        <section>
          <form class="claim-emotion">
            <label for="claim-emotion">
              What emotion is alive in you right now? What emotion are you
              experiencing right now?
            </label>
            <select type="text" name="claim-emotion" required>
              <option value="mad">Mad</option>
              <option value="sad">Sad</option>
              <option value="fear">Fear</option>
              <option value="glad">Glad</option>
              <option value="guilt">Guilt</option>
              <option value="shame">Shame</option>
            </select>
            <Button buttonText="Save" buttonType="submit"></Button>
          </form>
        </section>
        <section>
          <p>
            Even though it may be difficult and you may resist, Take another
            deep breath and try to really feel that emotion for a moment...
          </p>
        </section>
        <section>
          <form>
            <label for="name-color">
              What color would you associate with that feeling?
            </label>
            <select type="text" name="name-color" required>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Grey">Grey</option>
              <option value="Red">Red</option>
              <option value="Pink">Pink</option>
              <option value="Orange">Orange</option>
              <option value="Yellow">Yellow</option>
              <option value="Green">Green</option>
              <option value="Blue">Blue</option>
              <option value="Purple">Purple</option>
            </select>
            <Button buttonText="Save" buttonType="submit"></Button>
          </form>
        </section>
        <section>
          <Button buttonText="Go Deeper"></Button>
          <Button buttonText="Listen"></Button>
          <Button buttonText="Share"></Button>
        </section>
      </>
    );
  }
}

export default Grounding;
