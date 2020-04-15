import React from "react";
import ReactDOM from "react-dom";
import Safety from "./Safety";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Safety />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
