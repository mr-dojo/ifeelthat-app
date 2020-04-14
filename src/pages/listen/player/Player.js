import React from "react";

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

  return <div id="player">{iframe}</div>;
}

export default Player;
