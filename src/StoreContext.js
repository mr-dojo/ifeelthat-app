import React from "react";

const StoreContext = React.createContext({
  feeling: {
    id: Number,
    emotion: "",
    color: "",
  },
  sessionStorage: {},
  shareQueue: [],
  breatheSection: Number,
  sideDrawerOpen: Boolean,
  sharePosition: Number,
  updateFeeling: () => {},
  updateSharePosition: () => {},
  updateBreatheSection: () => {},
  updateShareType: () => {},
  handleToggleSideDrawer: () => {},
  handleColorSubmit: () => {},
  setSessionStorage: () => {},
  setPositionFromLocalStorage: () => {},
  populateShares: () => {},
  handleRedirect: () => {},
});

export default StoreContext;
