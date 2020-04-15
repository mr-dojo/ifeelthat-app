import React from "react";
import ReactDOM from "react-dom";
import ShareText from "./ShareText";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <ShareText />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
