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
    sessionStorage: {},
    updateFeeling: () => {},
    updatePosition: () => {},
    handleToggleSideDrawer: () => {},
    setPositionFromLocalStorage: () => {},
    setSessionStorage: () => {},
    handleRedirect: () => {},
  };

  static defaultProps = {};

  componentDidMount() {
    console.log("<App> componentDidMount() ran");
    this.syncFeeling();
    this.syncStep();
  }

  syncFeeling = () => {
    if (window.sessionStorage.getItem("feeling")) {
      const localStorageFeeling = window.sessionStorage.getItem("feeling");
      const feelingObj = JSON.parse(localStorageFeeling);
      this.setState({
        feeling: feelingObj,
      });
      console.log("syncFeeling() ran");
    } else {
      this.setState({
        feeling: {},
      });
      console.log("syncFeeling() ran and had nothing to update");
      return;
    }
  };

  syncStep = () => {
    if (window.sessionStorage.getItem("step")) {
      const sessionStorageStep = window.sessionStorage.getItem("step");
      const stepObj = JSON.parse(sessionStorageStep);
      this.setState({
        sessionStorage: stepObj,
        redirect: stepObj.path,
      });
      console.log("syncStep() ran");
    } else {
      this.setState({
        sessionStorage: {},
      });
      console.log("syncStep() ran and had nothing to update");
      return;
    }
  };

  updateFeeling = (newFeeling) => {
    this.setState(
      {
        feeling: newFeeling,
      },
      () => this.setSessionStorage("feeling", this.state.feeling)
    );
  };

  setSessionStorage = (key, valueObj) => {
    window.sessionStorage.setItem(key, JSON.stringify(valueObj));
    if (key === "step") {
      this.setState({
        sessionStorage: valueObj,
      });
    }
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

  handleToggleSideDrawer = () =>
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });

  handleRedirect = (path) => {
    this.syncFeeling();
    this.syncStep();
    this.setState({
      redirect: path,
    });
  };

  render() {
    const contextValues = {
      feeling: this.state.feeling,
      sharePosition: this.state.sharePosition,
      sideDrawerOpen: this.state.sideDrawerOpen,
      sessionStorage: this.state.sessionStorage,
      updateFeeling: this.updateFeeling,
      updatePosition: this.updatePosition,
      handleToggleSideDrawer: this.handleToggleSideDrawer,
      setPositionFromLocalStorage: this.setPositionFromLocalStorage,
      setSessionStorage: this.setSessionStorage,
      handleRedirect: this.handleRedirect,
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
