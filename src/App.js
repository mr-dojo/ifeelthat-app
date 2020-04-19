import React from "react";
import { Route } from "react-router-dom";
import ToolBar from "./components/toolBar/ToolBar";
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
    sideDrawerOpen: false,
    updateFeeling: () => {},
    updatePosition: () => {},
    handleToggleSideDrawer: () => {},
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

  handleToggleSideDrawer = () => {
    return this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  render() {
    const contextValues = {
      feeling: this.state.feeling,
      sharePosition: this.state.sharePosition,
      sideDrawerOpen: this.state.sideDrawerOpen,
      updateFeeling: this.updateFeeling,
      updatePosition: this.updatePosition,
      handleToggleSideDrawer: this.handleToggleSideDrawer,
    };
    return (
      <StoreContext.Provider value={contextValues}>
        <div className="content">
          <ScrollToTop />
          <ToolBar />
          {this.state.sideDrawerOpen ? <SideDrawer /> : ""}
          {this.state.sideDrawerOpen ? <Backdrop /> : ""}
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
