import React from "react";
import ReactDOM from "react-dom";
import ListenText from "./ListenText";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <ListenText
        share={{ share: { text_share: "testURL", emotion: "Angery" } }}
      />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
