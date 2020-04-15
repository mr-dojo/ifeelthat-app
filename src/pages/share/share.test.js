import React from "react";
import ReactDOM from "react-dom";
import Share from "./Share";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Share />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
