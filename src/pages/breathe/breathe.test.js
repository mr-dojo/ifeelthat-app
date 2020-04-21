import React from "react";
import ReactDOM from "react-dom";
import Breathe from "./Breathe";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Breathe />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
