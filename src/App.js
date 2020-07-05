import React from "react";
import { Route, Redirect } from "react-router-dom";
import ToolBar from "./components/toolBar/ToolBar";
import Landing from "./pages/landing/Landing";
import Breathe from "./pages/breathe/Breathe";
import Listen from "./pages/listen/Listen";
import Share from "./pages/share/Share";
import Survey from "./pages/survey/Survey";
import SideDrawer from "./components/sideDrawer/SideDrawer";
import BreatheTimer from "./components/breatheTimer/BreatheTimer";
import Backdrop from "./components/backdrop/Backdrop";
import Footer from "./components/footer/Footer";
import StoreContext from "./StoreContext";
import { API_ENDPOINT } from "./config";
import "./App.css";

import ScrollToTop from "./components/ScrollToTop";

class App extends React.Component {
  state = {
    feeling: {},
    sessionStorage: {},
    shareQueue: [],
    sideDrawerOpen: false,
    breatheTimerOpen: true,
    redirect: "",
    breatheSection: 1,
    shareSection: 1,
    sharePosition: 0,
    shareSubmitted: false,
  };

  componentDidMount() {
    this.syncFeeling();
    this.syncStep();
  }

  /*Updates feeling from Session Storage*/
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
    } else {
      this.setState({
        feeling: {},
      });
      return;
    }
  };

  /*Updates previous endpoint and variables from Session Storage*/
  syncStep = () => {
    if (window.sessionStorage.getItem("step")) {
      const sessionStorageStep = window.sessionStorage.getItem("step");
      const stepObj = JSON.parse(sessionStorageStep);
      this.ifPathIsBreathe(stepObj);
      this.setState({
        sessionStorage: stepObj,
        redirect: stepObj.path,
      });
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
      return;
    }
  };

  ifPathIsBreathe = (stepObj) => {
    if (stepObj.path === "/breathe") {
      this.setState({
        breatheSection: stepObj.section,
      });
    } else return;
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

  /*Finds if font color should be black or white
  based on the state.feeling.color*/
  contrastTextColor = (hex, bw) => {
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error("Invalid HEX color.");
    }
    var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      // http://stackoverflow.com/a/3943023/112731
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
    }
  };

  updateBreatheSection = (section) => {
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

  updateShareSection = (section) => {
    this.setState({
      shareSection: section,
    });
  };

  /*updates the share that the user is currently on*/
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
        if (res.status === 204) {
          console.log(`No posts yet under "${emotion}"`);
          return [];
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

  handleToggleBreatheTimer = () =>
    this.setState((prevState) => {
      return { breatheTimerOpen: !prevState.breatheTimerOpen };
    });

  handleRedirect = (path) => {
    this.syncFeeling();
    this.syncStep();
    this.setState({
      redirect: path,
    });
  };

  handleColorSubmit = (hex) => {
    const newObj = {
      emotion: this.state.feeling.emotion,
      color: hex,
    };
    const stepObj = { path: "/breathe", section: 5 };

    this.updateBreatheSection(5);
    this.updateFeeling(newObj);
    this.setSessionStorage("step", stepObj);
    this.patchColor(newObj);
    this.populateShares();
    this.setPositionFromLocalStorage();
  };

  updateFeeling = (newFeeling) => {
    this.setState(
      {
        feeling: newFeeling,
      },
      () => this.setSessionStorage("feeling", newFeeling)
    );
  };

  patchColor = (newObj) => {
    fetch(`${API_ENDPOINT}feeling/${this.state.feeling.id}`, {
      method: "PATCH",
      body: JSON.stringify(newObj),
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
        this.updateFeeling(resJson);
      });
  };

  render() {
    const contextValues = {
      feeling: this.state.feeling,
      sharePosition: this.state.sharePosition,
      sideDrawerOpen: this.state.sideDrawerOpen,
      sessionStorage: this.state.sessionStorage,
      breatheSection: this.state.breatheSection,
      shareSection: this.state.shareSection,
      shareQueue: this.state.shareQueue,
      updateFeeling: this.updateFeeling,
      updatePosition: this.updatePosition,
      updateBreatheSection: this.updateBreatheSection,
      updateShareSection: this.updateShareSection,
      handleToggleSideDrawer: this.handleToggleSideDrawer,
      handleToggleBreatheTimer: this.handleToggleBreatheTimer,
      handleColorSubmit: this.handleColorSubmit,
      setPositionFromLocalStorage: this.setPositionFromLocalStorage,
      populateShares: this.populateShares,
      setSessionStorage: this.setSessionStorage,
      handleRedirect: this.handleRedirect,
    };
    return (
      <StoreContext.Provider value={contextValues}>
        <div
          className="content section-1"
          style={{
            color: this.state.feeling.color
              ? this.contrastTextColor(this.state.feeling.color, true)
              : "#000000",
            backgroundColor: this.state.feeling.color
              ? this.state.feeling.color
              : "#FAFAFA",
          }}
        >
          <ScrollToTop />

          {this.state.redirect !== "" ? (
            <Redirect to={this.state.redirect} />
          ) : (
            ""
          )}

          <SideDrawer />

          {this.state.sideDrawerOpen ? <Backdrop /> : ""}
          {this.state.breatheTimerOpen ? <BreatheTimer /> : ""}

          <main>
            <Route path="/" component={ToolBar} />
            <Route exact path="/" component={Landing} />
            <Route path="/breathe" component={Breathe} />
            <Route exact path="/listen" component={Listen} />
            <Route exact path="/share" component={Share} />
            <Route exact path="/survey" component={Survey} />
          </main>
        </div>
        <Footer></Footer>
      </StoreContext.Provider>
    );
  }
}

export default App;
