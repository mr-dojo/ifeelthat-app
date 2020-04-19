import React from "react";
import Safety from "../safety/Safety";
import "./footer.css";

function Footer(props) {
  return (
    <footer title="footer" className="footer">
      <Safety></Safety>
      <p>created with love by mr-dojo</p>
    </footer>
  );
}

export default Footer;
