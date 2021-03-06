import React from "react";
import ReactDOM from "react-dom";
import Player from "./Player";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Player share={{ share: { audio_share: "testURL" } }} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
