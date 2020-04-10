import React from "react";

const StoreContext = React.createContext({
  feeling: {
    emotion: "",
    color: "",
  },
  sharePosition: "",
  updateFeeling: () => {},
  updateSharePosition: () => {},
});

export default StoreContext;
