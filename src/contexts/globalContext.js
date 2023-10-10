import React from "react";

const GlobalContext = React.createContext({
    testContext: false,
    setTestContext: () => {},
    // toggleDataTable
    toggleDataTable: false,
    setToggleDataTable: () => {},

    // order 
    totalMoneyToPay: 0,
    setTotalMoneyToPay: () => {},

    // render cart 
    reloadCart: false,
    setReloadCart: () => {},
});

export default GlobalContext;