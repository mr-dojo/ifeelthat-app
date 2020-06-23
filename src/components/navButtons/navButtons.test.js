import React from "react";
import ReactDOM from "react-dom";
import NavButtons from "./NavButtons";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <NavButtons />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
