import React from "react";

const StoreContext = React.createContext({
  feeling: {
    id: Number,
    emotion: "",
    color: "",
  },
  sideDrawerOpen: Boolean,
  sharePosition: Number,
  updateFeeling: () => {},
  updateSharePosition: () => {},
  handleToggleSideDrawer: () => {},
  setPositionFromLocalStorage: () => {},
});

export default StoreContext;
