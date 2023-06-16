import React from "react";

const GlobalContext = React.createContext({
    testContext: false,
    setTestContext: () => {},
});

export default GlobalContext;