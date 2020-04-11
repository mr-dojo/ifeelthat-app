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
import StoreContext from "./StoreContext";

class App extends React.Component {
  state = {
    feeling: {},
    sharePosition: 0,
    updateFeeling: () => {},
    updatePosition: () => {},
  };

  updateFeeling = (newFeeling) => {
    this.setState({
      feeling: newFeeling,
    });
  };

  updatePosition = () => {
    this.setState({
      sharePosition: this.state.sharePosition + 1,
    });
  };

  render() {
    const contextValues = {
      feeling: this.state.feeling,
      sharePosition: this.state.sharePosition,
      updateFeeling: this.updateFeeling,
      updatePosition: this.updatePosition,
    };
    return (
      <StoreContext.Provider value={contextValues}>
        <Nav></Nav>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/breathe" component={Grounding} />
          <Route exact path="/listen" component={Listen} />
          <Route exact path="/share" component={Share} />
        </main>
        <Safety></Safety>
        <Footer></Footer>
      </StoreContext.Provider>
    );
  }
}

export default App;
