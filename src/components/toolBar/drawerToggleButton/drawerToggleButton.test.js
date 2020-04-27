import React from "react";
import ReactDOM from "react-dom";
import DrawerToggleButton from "./DrawerToggleButton";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <DrawerToggleButton />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
