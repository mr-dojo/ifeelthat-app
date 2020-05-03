import React from "react";
import Button from "../../../components/button/Button";
import StoreContext from "../../../StoreContext";
import { Link } from "react-router-dom";

/* Renders an audio share */
class Player extends React.Component {
  static contextType = StoreContext;

  buildIframe = () => {
    const url = this.props.share.audio_share;
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
    return iframe;
  };

  render() {
    return (
      <>
        <div id="player">{this.buildIframe()}</div>
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

export default Player;
