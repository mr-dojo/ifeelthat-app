import React from "react";
import { Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Grounding from "./pages/grounding/Grounding";
import Listen from "./pages/listen/Listen";
import Share from "./pages/share/Share";
import SideDrawer from "./components/sideDrawer/SideDrawer";
import Backdrop from "./components/backdrop/Backdrop";
import Safety from "./components/safety/Safety";
import Footer from "./components/footer/Footer";
import StoreContext from "./StoreContext";
import "./App.css";

import ScrollToTop from "./components/ScrollToTop";

class App extends React.Component {
  state = {
    feeling: {},
    sharePosition: 0,
    navOpen: false,
    updateFeeling: () => {},
    updatePosition: () => {},
  };

  updateFeeling = (newFeeling) => {
    this.setState({
      feeling: newFeeling,
    });
  };

  updatePosition = (reset) => {
    if (reset) {
      this.setState({
        sharePosition: 0,
      });
    } else {
      this.setState({
        sharePosition: this.state.sharePosition + 1,
      });
    }
  };

  resetPosition = () => {
    this.setState({
      sharePosition: this.state.sharePosition + 1,
    });
  };

  render() {
    const contextValues = {
      feeling: this.state.feeling,
      sharePosition: this.state.sharePosition,
      navOpen: this.state.navOpen,
      updateFeeling: this.updateFeeling,
      updatePosition: this.updatePosition,
    };
    return (
      <StoreContext.Provider value={contextValues}>
        <div className="content">
          <ScrollToTop />
          <SideDrawer />
          <Backdrop />
          <main>
            <Route exact path="/" component={Landing} />
            <Route path="/breathe" component={Grounding} />
            <Route exact path="/listen" component={Listen} />
            <Route exact path="/share" component={Share} />
          </main>
          <Safety></Safety>
        </div>
        <Footer></Footer>
      </StoreContext.Provider>
    );
  }
}

export default App;
