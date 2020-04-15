import React from "react";
import Button from "../../../components/button/Button";
import { Link } from "react-router-dom";

export default function ListenText(props) {
  // split the text value on /\n/g and divide into paragraph tags
  // const distributeNewLines = () => {
  //   let shareText = this.props.share.share_text;
  //   shareText = shareText.split(/\n/);
  //   console.log(shareText);
  //   for (let i = 0; i < shareText.length; i++) {
  //     return <p className="listen-text">{shareText[i]}</p>;
  //   }
  // };
  return (
    <>
      <h2>{props.share.emotion}</h2>
      <p>{props.share.text_share}</p>
      <Button buttonText="Next" onClick={() => props.next()}></Button>
      <Link className="nav-link" to="/share">
        <Button buttonText="Share" />
      </Link>
    </>
  );
}
