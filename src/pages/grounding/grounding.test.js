import React from "react";
import ReactDOM from "react-dom";
import Grounding from "./Grounding";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Grounding />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
