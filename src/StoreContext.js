import React from "react";

const StoreContext = React.createContext({
  feeling: {
    id: Number,
    emotion: "",
    color: "",
  },
  sideDrawerOpen: Boolean,
  sharePosition: Number,
  sessionStorage: {},
  updateFeeling: () => {},
  updateSharePosition: () => {},
  handleToggleSideDrawer: () => {},
  setSessionStorage: () => {},
  setPositionFromLocalStorage: () => {},
  handleRedirect: () => {},
});

export default StoreContext;
