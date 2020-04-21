import React from "react";
import { Route, Redirect } from "react-router-dom";
import ToolBar from "./components/toolBar/ToolBar";
import Landing from "./pages/landing/Landing";
import Breathe from "./pages/breathe/Breathe";
import Listen from "./pages/listen/Listen";
import Share from "./pages/share/Share";
import SideDrawer from "./components/sideDrawer/SideDrawer";
import Backdrop from "./components/backdrop/Backdrop";
import Footer from "./components/footer/Footer";
import StoreContext from "./StoreContext";
import "./App.css";

import ScrollToTop from "./components/ScrollToTop";

class App extends React.Component {
  state = {
    feeling: {},
    sharePosition: 0,
    sideDrawerOpen: false,
    redirect: "",
    updateFeeling: () => {},
    updatePosition: () => {},
    handleToggleSideDrawer: () => {},
    setPositionFromLocalStorage: () => {},
  };

  static defaultProps = {};

  componentDidMount() {
    if (window.localStorage.getItem("feeling")) {
      const localStorageFeeling = window.localStorage.getItem("feeling");
      const feelingObj = JSON.parse(localStorageFeeling);
      this.setState({
        feeling: feelingObj,
      });
    }
    if (window.localStorage.getItem("step")) {
      const localStorageStep = window.localStorage.getItem("step");
      const stepObj = JSON.parse(localStorageStep);
      this.setState({
        redirect: stepObj.path,
      });
    }
  }

  updateFeeling = (newFeeling) => {
    this.setState(
      {
        feeling: newFeeling,
      },
      () =>
        window.localStorage.setItem(
          "feeling",
          JSON.stringify(this.state.feeling)
        )
    );
  };

  setPositionFromLocalStorage = (position) => {
    this.setState({
      sharePosition: position,
    });
  };

  updatePosition = (reset) => {
    if (reset) {
      this.setState({
        sharePosition: 0,
      });
    } else {
      this.setState(
        (prevState) => ({
          sharePosition: parseInt(prevState.sharePosition) + 1,
        }),
        () => {
          window.localStorage.setItem(
            this.state.feeling.emotion,
            this.state.sharePosition
          );
        }
      );
    }
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
      setPositionFromLocalStorage: this.setPositionFromLocalStorage,
    };
    return (
      <StoreContext.Provider value={contextValues}>
        <div className="content">
          <ScrollToTop />
          {this.state.redirect !== "" ? (
            <Redirect to={this.state.redirect} />
          ) : (
            ""
          )}
          <SideDrawer />
          {this.state.sideDrawerOpen ? <Backdrop /> : ""}
          <main>
            <Route path="/" component={ToolBar} />
            <Route exact path="/" component={Landing} />
            <Route path="/breathe" component={Breathe} />
            <Route exact path="/listen" component={Listen} />
            <Route exact path="/share" component={Share} />
          </main>
        </div>
        <Footer></Footer>
      </StoreContext.Provider>
    );
  }
}

export default App;
