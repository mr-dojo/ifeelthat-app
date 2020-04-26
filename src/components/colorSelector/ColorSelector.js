import React from "react";
import StoreContext from "../../StoreContext";
import "./colorSelector.css";

class ColorSelector extends React.Component {
  static contextType = StoreContext;

  state = {
    colorOptions: [
      {
        name: "color",
        hex: "#0E0E0E",
        ariaLabel: "choose black",
      },
      {
        name: "color",
        hex: "#6C6C6C",
        ariaLabel: "choose grey",
      },
      {
        name: "color",
        hex: "#FFFFFF",
        ariaLabel: "choose white",
      },
      {
        name: "color",
        hex: "#834627",
        ariaLabel: "choose brown",
      },
      {
        name: "color",
        hex: "#FE0000",
        ariaLabel: "choose ",
      },
      {
        name: "color",
        hex: "#FE7401",
        ariaLabel: "choose orange",
      },
      {
        name: "color",
        hex: "#F45EB7",
        ariaLabel: "choose pink",
      },
      {
        name: "color",
        hex: "#F0A12C",
        ariaLabel: "choose gold",
      },
      {
        name: "color",
        hex: "#FFFE03",
        ariaLabel: "choose yellow",
      },
      {
        name: "color",
        hex: "#01CD02",
        ariaLabel: "choose green",
      },
      {
        name: "color",
        hex: "#1241AC",
        ariaLabel: "choose blue",
      },
      {
        name: "color",
        hex: "#151B4A",
        ariaLabel: "choose navy",
      },
      {
        name: "color",
        hex: "#7308AC",
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
