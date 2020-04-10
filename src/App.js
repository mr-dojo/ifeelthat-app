import React from "react";
import { Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Landing from "./pages/landing/Landing";
import Grounding from "./pages/grounding/Grounding";
import Listen from "./pages/listen/Listen";
import Share from "./pages/share/Share";
import Safety from "./components/safety/Safety";
import "./App.css";
import Footer from "./components/footer/Footer";

class App extends React.Component {
  render() {
    return (
      <>
        <Nav></Nav>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/breathe" component={Grounding} />
          <Route exact path="/listen" component={Listen} />
          <Route exact path="/share" component={Share} />
        </main>
        <Safety></Safety>
        <Footer></Footer>
      </>
    );
  }
}

export default App;
