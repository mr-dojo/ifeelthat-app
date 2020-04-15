import React from "react";
import ReactDOM from "react-dom";
import Listen from "./Listen";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Listen />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
