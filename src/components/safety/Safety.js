import React from "react";
import Button from "../button/Button";

class Safety extends React.Component {
  state = {
    buttonPressed: false,
  };

  handleButtonPress = () => {
    console.log("button was pressed");
    this.setState({
      buttonPressed: !this.state.buttonPressed,
    });
  };

  render() {
    return (
      <>
        {this.state.buttonPressed ? (
          <section>
            <h2>Reach out for help, you arn't alone</h2>
            <a
              href="tel:+18002738255"
              target="_blank"
              rel="noopener noreferrer"
            >
              Call Lifeline
            </a>
            <a
              href="https://suicidepreventionlifeline.org/chat/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat with somebody
            </a>
            <Button
              buttonText="Close"
              onClick={() => this.handleButtonPress()}
            />
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
