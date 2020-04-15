import React from "react";
import Button from "../../../components/button/Button";
import { Link } from "react-router-dom";
import StoreContext from "../../../StoreContext";
import { API_ENDPOINT } from "../../../config";

export default class ShareText extends React.Component {
  static contextType = StoreContext;

  state = {
    submitted: false,
  };

  handleTextDelete = (e) => {
    e.preventDefault();
    this.setState({
      submitted: true,
    });
  };

  handleTextSubmit = (e) => {
    e.preventDefault();
    const { id, emotion } = this.context.feeling;
    const text = e.target.text.value;
    const newShare = {
      text_share: text,
      share_type: "Text",
      feeling_id: id,
      emotion: emotion,
    };

    this.setState({
      submitted: true,
    });

    fetch(`${API_ENDPOINT}share`, {
      method: "POST",
      body: JSON.stringify(newShare),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return new Error(res.message);
        }
        return res.json();
      })
      .then((resJson) => {
        document.getElementById("another-breath").scrollIntoView(true);
      });
  };

  renderInputBox = () => {
    return (
      <section>
        <form onSubmit={(e) => this.handleTextSubmit(e)}>
          <label htmlFor="share-text">Express yourself</label>
          <textarea
            type="text"
            rows="10"
            columns="30"
            name="share-text"
            id="text"
            placeholder="Speak to that [color] [emotion] you are experiencing..."
            required
          ></textarea>
          <Button buttonText="Share" buttonType="submit"></Button>
          <Button
            buttonText="Burn it / Delete"
            onClick={(e) => this.handleTextDelete(e)}
          ></Button>
        </form>
      </section>
    );
  };

  render() {
    return (
      <>
        {!this.state.submitted ? this.renderInputBox() : ""}
        <section id="another-breath">
          <p>
            Take another deep breath and appreciate the lightness that comes
            from expressing these feelings
          </p>
          <Link className="nav-link" to="/listen">
            <Button buttonText="Listen" />
          </Link>
        </section>
      </>
    );
  }
}
