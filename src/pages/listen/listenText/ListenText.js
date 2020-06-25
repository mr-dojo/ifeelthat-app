import React from "react";
import Button from "../../../components/button/Button";
import StoreContext from "../../../StoreContext";
import { Link } from "react-router-dom";

/* Renders a text share */
export default class ListenText extends React.Component {
  static contextType = StoreContext;

  render() {
    return (
      <section className="div-container_eighty-vh section_margin">
        <header>
          <h2>{this.props.share.emotion}</h2>
        </header>
        <p>{this.props.share.text_share}</p>
        <Button buttonText="Next" onClick={() => this.props.next()}></Button>
        <Button
          buttonText="Share"
          onClick={() => {
            const stepObj = { path: "/share" };
            this.context.setSessionStorage("step", stepObj);
            this.context.handleRedirect("/share");
          }}
        />
      </section>
    );
  }
}
