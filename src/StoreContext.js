import React from "react";

const StoreContext = React.createContext({
  feeling: {
    id: Number,
    emotion: "",
    color: "",
  },
  sessionStorage: {},
  breatheSection: Number,
  sideDrawerOpen: Boolean,
  sharePosition: Number,
  updateFeeling: () => {},
  updateSharePosition: () => {},
  updateBreatheSection: () => {},
  handleToggleSideDrawer: () => {},
  setSessionStorage: () => {},
  setPositionFromLocalStorage: () => {},
  handleRedirect: () => {},
});

export default StoreContext;
