import React from "react";
import Button from "../../../components/button/Button";
import { Link } from "react-router-dom";

function Player(props) {
  const url = props.share.audio_share;
  const fullURL = `${url}&color=%23201812&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`;
  const iframe = (
    <iframe
      title="iframeplayer"
      width="100%"
      height="200"
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      src={fullURL}
    ></iframe>
  );

  return (
    <>
      <div id="player">{iframe}</div>
      <Button buttonText="Next" onClick={() => props.next()}></Button>
      <Link className="nav-link" to="/share">
        <Button buttonText="Share" />
      </Link>
    </>
  );
}

export default Player;
