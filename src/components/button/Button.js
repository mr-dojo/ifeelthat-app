import React from "react";

function Button(props) {
  const { buttonText, buttonType = "button", onClick = () => {} } = props;
  return (
    <button className="button-element" onClick={onClick} type={buttonType}>
      {buttonText}
    </button>
  );
}

export default Button;
