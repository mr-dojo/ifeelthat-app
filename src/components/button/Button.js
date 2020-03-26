import React from "react";

function Button(props) {
  const { buttonText, buttonType = "button" } = props;
  return (
    <button className="button-element" type={buttonType}>
      {buttonText}
    </button>
  );
}

export default Button;
