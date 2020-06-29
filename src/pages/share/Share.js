import React from "react";
import ShareText from "./shareText/ShareText";
import Button from "../../components/button/Button";
import StoreContext from "../../StoreContext";
import NavButtons from "../../components/navButtons/NavButtons";

/* Renders either a text or soundcloud iframe form based on user input */
class Share extends React.Component {
  static contextType = StoreContext;

  state = {
    onTopOfPage: true,
    shareType: "Text",
    breathButtonText: "Breathe",
  };

  renderGuidelines = () => {
    return (
      <section>
        <div className="div-container_eighty-vh section_margin">
          <header>
            <h2>Guidelines</h2>
          </header>
          <p className="medium-text">
            We keep this a safe place by self monitoring
          </p>
          <p className="small-text">
            Please, when sharing, <strong>do not</strong> use names or details
            of others. Talk about <strong>your own</strong> experience.
          </p>
          <p className="small-text">Be honest and speak from your heart</p>
          <Button
            buttonText="Agree"
            onClick={(e) => this.context.updateShareSection(2)}
          />
        </div>
      </section>
    );
  };

  renderAfterShare = () => {
    return (
      <section>
        <div className="div-container_eighty-vh section_margin">
          <header>
            <h2 className="medium-text">
              How do you feel <strong>now?</strong>
            </h2>
          </header>
          <p className="small-text">What, if anything, is different?</p>
          <p className="xtra-small-text">
            Take another deep breath and be mindful of any feelings that come
            up.
          </p>
          <Button
            buttonText={this.state.breathButtonText}
            onClick={() => {
              let inCount = 5;
              let outCount = 5;
              let timer = setInterval(() => {
                if (inCount !== 0) {
                  this.setState({
                    breathButtonText: `Breathe In ${inCount}`,
                  });
                  inCount = inCount - 1;
                } else if (outCount !== 0) {
                  this.setState({
                    breathButtonText: `Breathe Out ${outCount}`,
                  });
                  outCount--;
                } else {
                  clearInterval(timer);
                  return this.setState(
                    {
                      breathButtonText: "Breathe",
                    },
                    () => {
                      this.context.updateShareSection(5);
                    }
                  );
                }
              }, 1000);
            }}
          ></Button>
        </div>
      </section>
    );
  };

  render() {
    return (
      <>
        <header roll="header" className="flatten">
          <h1 className="flatten transparent">Share yourself with others</h1>
        </header>
        {this.context.shareSection === 1 ? this.renderGuidelines() : ""}
        {this.context.shareSection === 2 ? <ShareText /> : ""}
        {this.context.shareSection === 3 ? this.renderAfterShare() : ""}
        {this.context.shareSection === 4 ? (
          <section>
            <div className="div-container_eighty-vh section_margin">
              <NavButtons
                listen={true}
                identify={true}
                share={true}
                survey={true}
              />
            </div>
          </section>
        ) : (
          ""
        )}
        {this.context.shareSection === 5 ? (
          <section>
            <div className="div-container_eighty-vh section_margin">
              <NavButtons listen={true} identify={true} survey={true} />
            </div>
          </section>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default Share;
