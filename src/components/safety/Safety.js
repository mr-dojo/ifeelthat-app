import React from "react";
import Button from "../button/Button";
import { animateScroll as scroll } from "react-scroll";
import "./safety.css";

class Safety extends React.Component {
  state = {
    buttonPressed: false,
  };

  scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  handleButtonPress = () => {
    this.setState(
      (prevState) => ({
        buttonPressed: !prevState.buttonPressed,
      }),
      () => this.scrollToBottom()
    );
  };

  render() {
    return (
      <>
        {this.state.buttonPressed ? (
          <section className="space-evenly">
            <h2>Reach out for help, you aren't alone</h2>
            <div>
              <a
                className="safety__link"
                href="tel:+18002738255"
                target="_blank"
                rel="noopener noreferrer"
              >
                Call Lifeline
              </a>
              <a
                className="safety__link"
                href="https://suicidepreventionlifeline.org/chat/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat with somebody
              </a>
              <a
                className="safety__link"
                href="https://suicidepreventionlifeline.org/help-yourself/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Help yourself
              </a>
              <Button
                buttonText="Close"
                onClick={() => this.handleButtonPress()}
              />
            </div>
          </section>
        ) : (
          <Button
            buttonText="Safety"
            onClick={() => this.handleButtonPress()}
          />
        )}
      </>
    );
  }
}

export default Safety;
