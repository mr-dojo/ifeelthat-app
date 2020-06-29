import React from "react";
import "./button.css";

function Button(props) {
  const {
    buttonText,
    buttonTextClass,
    buttonType = "button",
    buttonClass = "button",
    onClick = () => {},
  } = props;
  return (
    <button className={buttonClass} onClick={onClick} type={buttonType}>
      <span className={buttonTextClass}>{buttonText}</span>
    </button>
  );
}

export default Button;
