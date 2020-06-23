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
  shareSection: Number,
  sideDrawerOpen: Boolean,
  sharePosition: Number,
});

export default StoreContext;
