import React from "react";
import ReactDOM from "react-dom";
import Survey from "./Survey";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Survey />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
