import React from "react";

const StoreContext = React.createContext({
  feeling: {
    id: Number,
    emotion: "",
    color: "",
  },
  sharePosition: "",
  updateFeeling: () => {},
  updateSharePosition: () => {},
});

export default StoreContext;
