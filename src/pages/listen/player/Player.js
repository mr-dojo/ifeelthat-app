import React from "react";

class Player extends React.Component {
  soundCloudIframe = (
    <iframe
      title="unique title"
      width="100%"
      height="300"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/792329326%3Fsecret_token%3Ds-0fZdm04kM2i&color=%23201812&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false"
    ></iframe>
  );

  render() {
    return <div id="player">{this.soundCloudIframe}</div>;
  }
}

export default Player;
