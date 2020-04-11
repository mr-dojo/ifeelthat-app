import React from "react";
import Button from "../../../components/button/Button";

export default class ShareText extends React.Component {
  render() {
    return (
      <section>
        <form>
          <label htmlFor="share-text">Express yourself</label>
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
    );
  }
}
