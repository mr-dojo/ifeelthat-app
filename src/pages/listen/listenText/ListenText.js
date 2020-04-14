import React from "react";

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
    <section>
      <h2>{props.share.emotion}</h2>
      <p>{props.share.text_share}</p>
    </section>
  );
}
