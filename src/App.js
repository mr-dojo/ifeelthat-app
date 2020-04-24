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
import { API_ENDPOINT } from "./config";
import "./App.css";

import ScrollToTop from "./components/ScrollToTop";

class App extends React.Component {
  state = {
    feeling: {},
    sharePosition: 0,
    sideDrawerOpen: false,
    redirect: "",
    sessionStorage: {},
    shareQueue: [],
    breatheSection: 1,
    updateFeeling: () => {},
    updatePosition: () => {},
    updateBreatheSection: () => {},
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
      const feelingString = window.sessionStorage.getItem("feeling");
      const feelingObj = JSON.parse(feelingString);
      this.setState({
        feeling: feelingObj,
      });
      // Check if emotion has a sharePosition
      if (window.localStorage.getItem(feelingObj.emotion)) {
        const position = window.localStorage.getItem(feelingObj.emotion);
        this.setState({
          sharePosition: position,
        });
      } else {
        this.setState({ sharePosition: 0 });
      }
      console.log(`syncFeeling() ran and feeling = ${feelingObj}`);
    } else {
      this.setState({
        feeling: {},
      });
      console.log(
        "syncFeeling() ran and had nothing to update so it set feeling = {}"
      );
      return;
    }
  };

  syncStep = () => {
    if (window.sessionStorage.getItem("step")) {
      const sessionStorageStep = window.sessionStorage.getItem("step");
      const stepObj = JSON.parse(sessionStorageStep);
      this.ifPathIsBreathe(stepObj);
      this.setState({
        sessionStorage: stepObj,
        redirect: stepObj.path,
      });
      console.log("syncStep() ran and setState");
    } else {
      const stepObj = { path: "/" };
      this.setState(
        {
          breatheSection: 1,
        },
        () => {
          this.setSessionStorage("step", stepObj);
        }
      );
      console.log("syncStep() ran and had nothing to update");
      return;
    }
  };

  ifPathIsBreathe = (stepObj) => {
    if (stepObj.path === "/breathe") {
      console.log(this.context.breatheSection);
      this.setState(
        {
          breatheSection: stepObj.section,
        },
        () => console.log(this.context.breatheSection)
      );
    } else return;
  };

  updateFeeling = (newFeeling) => {
    this.setState(
      {
        feeling: newFeeling,
      },
      () => this.setSessionStorage("feeling", this.state.feeling)
    );
  };

  updateBreatheSection = (section) => {
    console.log("updateBreatheSection() ran");
    this.setState(
      {
        breatheSection: section,
      },
      () => {
        const newStep = { path: "/breathe", section: section };
        window.sessionStorage.setItem("step", JSON.stringify(newStep));
      }
    );
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

  setSessionStorage = (key, valueObj) => {
    window.sessionStorage.setItem(key, JSON.stringify(valueObj));
    if (key === "step") {
      this.setState({
        sessionStorage: valueObj,
      });
    }
  };

  setPositionFromLocalStorage = () => {
    if (window.localStorage.getItem(this.state.feeling.emotion)) {
      const sharePosition = window.localStorage.getItem(
        this.state.feeling.emotion
      );
      this.setState({
        sharePosition: sharePosition,
      });
    } else {
      this.setState({ sharePosition: 0 });
    }
  };

  populateShares = () => {
    const emotion = this.state.feeling.emotion;
    const fullURL = `${API_ENDPOINT}share/find?emotion=${emotion}`;
    fetch(fullURL, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return new Error(res.message);
        }
        return res.json();
      })
      .then((resJson) => {
        this.setState({
          shareQueue: resJson,
        });
      })
      .catch();
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
      breatheSection: this.state.breatheSection,
      shareQueue: this.state.shareQueue,
      updateFeeling: this.updateFeeling,
      updatePosition: this.updatePosition,
      updateBreatheSection: this.updateBreatheSection,
      handleToggleSideDrawer: this.handleToggleSideDrawer,
      setPositionFromLocalStorage: this.setPositionFromLocalStorage,
      populateShares: this.populateShares,
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
