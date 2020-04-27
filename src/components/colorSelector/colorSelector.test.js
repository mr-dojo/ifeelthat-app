import React from "react";
import ReactDOM from "react-dom";
import ColorSelector from "./ColorSelector";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <ColorSelector />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
