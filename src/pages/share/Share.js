import React from "react";
import Button from "../../components/button/Button";

class Share extends React.Component {
  render() {
    return (
      <>
        <header>
          <h1>Share</h1>
        </header>
        <section>
          <p>
            Take another deep breath and allow yourself to feel that emotion...
          </p>
        </section>
        <section>
          <form>
            <label for="share-intention">Set Intention</label>
            <input
              type="text"
              placeholder="Write a short intention"
              required
            ></input>
            <Button buttonText="Share" buttonType="submit"></Button>
          </form>
        </section>
        <section>
          <form>
            <label for="share-intention">Choose how you want to share</label>
            <select name="share-type">
              <option value="text">Text</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
            </select>
            <Button buttonText="Share" buttonType="submit"></Button>
          </form>
        </section>
        <section>
          <h2>Guidelines</h2>
          <p>
            My hope for you is that...[be honest, go deep, experience repressed
            emotion, find lesson, bring it into your life]
          </p>
          <p>
            Not sharring names(or other personal information) this creates a
            space that is safe and comfortable. anonminity creates the container
            and makes us feel safe and bit on confidentiality
          </p>
          <p>
            [guidance about keeping focused on your intention and emotion during
            the share] use kindergarden words
          </p>
          <p>Avoid story, keep with emotion, breath, [use "I" statements]</p>
        </section>
        <section>
          <p>
            [this section displays a form for the chosen method of sharing
            (text/audio/video)]
          </p>
          <form>
            <label for="share-text">Express yourself</label>
            <textarea
              type="text"
              rows="10"
              columns="30"
              name="share-text"
              placeholder="Speak to that [color] [emotion] you are experiencing..."
              required
            ></textarea>
            <Button buttonText="Share" buttonType="submit"></Button>
          </form>
        </section>
        <section>
          <p>
            Take another deep breath and apprecieate the lightness that comes
            expressing your feelings
          </p>
        </section>
        <Button buttonText="Share"></Button>
        <Button buttonText="Let it go/release/burn it/delete/shed"></Button>
      </>
    );
  }
}

export default Share;
