import React from "react";

const GlobalContext = React.createContext({
    testContext: false,
    setTestContext: () => {},
    // toggleDataTable
    toggleDataTable: false,
    setToggleDataTable: () => {},
});

export default GlobalContext;