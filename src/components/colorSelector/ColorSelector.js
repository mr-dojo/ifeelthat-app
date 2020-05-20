import React from "react";
import StoreContext from "../../StoreContext";
import "./colorSelector.css";

class ColorSelector extends React.Component {
  static contextType = StoreContext;

  state = {
    colorOptions: [
      {
        name: "color",
        hex: "#262626",
        ariaLabel: "choose black",
      },
      {
        name: "color",
        hex: "#858585",
        ariaLabel: "choose grey",
      },
      {
        name: "color",
        hex: "#FAFAFA",
        ariaLabel: "choose white",
      },
      {
        name: "color",
        hex: "#a95a32",
        ariaLabel: "choose brown",
      },
      {
        name: "color",
        hex: "#ff3333",
        ariaLabel: "choose red",
      },
      {
        name: "color",
        hex: "#fe8f34",
        ariaLabel: "choose orange",
      },
      {
        name: "color",
        hex: "#f78dcc",
        ariaLabel: "choose pink",
      },
      {
        name: "color",
        hex: "#f4b75d",
        ariaLabel: "choose gold",
      },
      {
        name: "color",
        hex: "#ffff66",
        ariaLabel: "choose yellow",
      },
      {
        name: "color",
        hex: "#01fe01",
        ariaLabel: "choose green",
      },
      {
        name: "color",
        hex: "#1856e7",
        ariaLabel: "choose blue",
      },
      {
        name: "color",
        hex: "#a20bf4",
        ariaLabel: "choose purple",
      },
    ],
  };

  renderColors = () => {
    const colorButtons = this.state.colorOptions.map((color, i) => (
      <button
        className="color-chooser_button drop-shadow"
        key={i}
        style={{ backgroundColor: color.hex }}
        aria-label={color.ariaLabel}
        value={color.hex}
        onClick={() => this.context.handleColorSubmit(color.hex)}
      />
    ));

    return colorButtons;
  };

  render() {
    return (
      <div className="color-chooser_container">
        <form className="color-chooser_form">{this.renderColors()}</form>
      </div>
    );
  }
}

export default ColorSelector;
