import React from "react";

const StoreContext = React.createContext({
  feeling: {
    id: Number,
    emotion: "",
    color: "",
  },
  shareText: "",
  sessionStorage: {},
  shareQueue: [],
  breatheSection: Number,
  shareSection: Number,
  sideDrawerOpen: Boolean,
  breatheTimerOpen: Boolean,
  sharePosition: Number,
});

export default StoreContext;
