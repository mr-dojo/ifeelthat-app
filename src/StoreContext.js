import React from "react";

const StoreContext = React.createContext({
  feeling: {
    id: Number,
    emotion: "",
    color: "",
  },
  navOpen: Boolean,
  sharePosition: Number,
  updateFeeling: () => {},
  updateSharePosition: () => {},
});

export default StoreContext;
