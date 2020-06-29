import React from "react";
import "./survey.css";

function Survey(props) {
  const renderIframe = () => {
    let width;
    let height;

    if (window.innerWidth <= 500) {
      width = "320";
      height = "2300";
    }

    if (window.innerWidth > 500 && window.innerWidth <= 1100) {
      width = "500";
      height = "1900";
    }

    if (window.innerWidth > 1100) {
      width = "1000";
      height = "1800";
    }

    return (
      <iframe
        title="Google Form Survey"
        src="https://docs.google.com/forms/d/e/1FAIpQLSfOUKyiiPtqPAfu3OUXdYyeqZlB9e1Z68t4accqFEida8-6tg/viewform?embedded=true"
        width={width}
        height={height}
        frameborder="0"
        marginheight="0"
        marginwidth="0"
      >
        Loading…
      </iframe>
    );
  };
  return (
    <>
      <header roll="header" className="flatten">
        <h1 className="flatten transparent">Fill out our survey</h1>
      </header>
      <div className="top-spacer" />
      {renderIframe()}
    </>
  );
}

export default Survey;
