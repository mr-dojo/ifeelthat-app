import React from "react";

const StoreContext = React.createContext({
  feeling: {
    id: Number,
    emotion: "",
    color: "",
  },
  sharePosition: Number,
  updateFeeling: () => {},
  updateSharePosition: () => {},
});

export default StoreContext;
