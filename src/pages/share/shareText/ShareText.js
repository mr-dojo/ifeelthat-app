import React from "react";
import Button from "../../../components/button/Button";
import StoreContext from "../../../StoreContext";
import { API_ENDPOINT } from "../../../config";
import "./shareText.css";

/* Renders a text input form */
export default class ShareText extends React.Component {
  static contextType = StoreContext;

  constructor(props) {
    super();
    this.state = {
      breathButtonText: "Breathe",
      shareText: "",
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
  }

  handleTextDelete = (e) => {
    e.preventDefault();
    this.setState({
      submitted: true,
      shareText: "",
    });
  };

  handleTextChange = (e) => {
    this.setState({
      shareText: e.target.value,
    });
  };

  handleTextSubmit = (e) => {
    e.preventDefault();
    const { id, emotion } = this.context.feeling;
    const text = this.state.shareText;
    const newShare = {
      text_share: text,
      share_type: "Text",
      feeling_id: id,
      emotion: emotion,
    };

    fetch(`${API_ENDPOINT}pending`, {
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
        this.context.updateShareSection(3);
      });
  };

  handleCancel = () => {
    this.context.updateShareSection(4);
  };

  renderTextForm = () => {
    return (
      <section>
        <div className="div-container_eighty-vh section_margin">
          <h2>
            {this.context.feeling.emotion
              ? `Feeling of ${this.context.feeling.emotion}`
              : ""}
          </h2>
          <form onSubmit={this.handleTextSubmit}>
            <label
              htmlFor="share-text"
              aria-label="Express yourself below"
            ></label>
            <textarea
              onChange={(e) => this.handleTextChange(e)}
              className="share-text_input-box"
              type="text"
              rows="10"
              columns="30"
              name="share-text"
              id="text"
              placeholder="Just let the expression flow, stick with that feeling..."
              value={this.state.shareText}
              required
            ></textarea>
            <Button buttonText="Share it" buttonType="submit"></Button>
            {!this.state.shareText ? (
              <Button
                buttonText="Cancel"
                onClick={(e) => this.handleCancel()}
              />
            ) : (
              <Button
                buttonText="Burn it"
                onClick={(e) => this.handleTextDelete(e)}
              ></Button>
            )}
          </form>
        </div>
      </section>
    );
  };

  render() {
    return this.renderTextForm();
  }
}
