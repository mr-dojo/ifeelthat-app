import React from "react";
import Button from "../../../components/button/Button";
import StoreContext from "../../../StoreContext";
import { API_ENDPOINT } from "../../../config";
import "./shareText.css";
import AreYouSure from "../../../components/areYouSure/AreYouSure";

/* Renders a text input form */
export default class ShareText extends React.Component {
  static contextType = StoreContext;

  constructor(props) {
    super();
    this.state = {
      deleteCheck: false,
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
  }

  handleDeleteText = () => {
    this.setState({
      deleteCheck: false,
    });
    this.context.updateShareText("");
  };

  handleDeleteTextCancel = () => {
    this.setState({
      deleteCheck: false,
    });
  };

  handleTextChange = (e) => {
    this.context.updateShareText(e.target.value);
  };

  handleTextSubmit = (e) => {
    e.preventDefault();
    const { id, emotion } = this.context.feeling;
    const text = this.context.shareText;
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
        this.handleDeleteText();
      });
  };

  handleCancel = () => {
    this.context.updateShareSection(4);
  };

  renderTextForm = () => {
    return (
      <section>
        <div className="div-container_eighty-vh section_margin">
          <header>
            <h2>
              {this.context.feeling.emotion
                ? `Feeling of ${this.context.feeling.emotion}`
                : ""}
            </h2>
          </header>
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
              value={this.context.shareText}
              required
            ></textarea>
            {!this.context.shareText ? (
              <>
                <Button buttonText="Share it" buttonType="submit"></Button>
                <Button
                  buttonText="Cancel"
                  onClick={(e) => this.handleCancel()}
                />
              </>
            ) : !this.state.deleteCheck ? (
              <>
                <Button buttonText="Share it" buttonType="submit"></Button>
                <Button
                  buttonText="Burn it"
                  onClick={() => this.setState({ deleteCheck: true })}
                ></Button>
              </>
            ) : (
              <AreYouSure
                yesCallback={this.handleDeleteText}
                noCallback={this.handleDeleteTextCancel}
              ></AreYouSure>
            )}
          </form>
        </div>
      </section>
    );
  };

  render() {
    return <>{this.renderTextForm()}</>;
  }
}
