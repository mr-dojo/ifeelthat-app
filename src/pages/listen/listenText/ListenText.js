import React from "react";
import Button from "../../../components/button/Button";
import StoreContext from "../../../StoreContext";
import { Link } from "react-router-dom";

/* Renders a text share */
export default class ListenText extends React.Component {
  static contextType = StoreContext;

  render() {
    return (
      <>
        <h2>{this.props.share.emotion}</h2>
        <p>{this.props.share.text_share}</p>
        <Button buttonText="Next" onClick={() => this.props.next()}></Button>
        <Link className="nav-link" to="/share">
          <Button
            buttonText="Share"
            onClick={() => {
              const stepObj = { path: "/share" };
              this.context.setSessionStorage("step", stepObj);
              this.context.handleRedirect("/share");
            }}
          />
        </Link>
      </>
    );
  }
}
