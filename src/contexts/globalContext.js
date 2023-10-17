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

    // check payment online success
    paymentOnlineSuccess: false,
    setPaymentOnlineSuccess: () => {},

    // congrat
    showCongrat: false,
    setShowCongrat: () => {},
});

export default GlobalContext;