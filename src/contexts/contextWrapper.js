import React, { useState } from "react";
import GlobalContext from "./globalContext";

function ContextWrapper(props) {
    const [testContext, setTestContext] = useState(false);
    const [toggleDataTable, setToggleDataTable] = useState(false);
    // order
    const [totalMoneyToPay, setTotalMoneyToPay] = useState(0);
    // cart 
    const [reloadCart, setReloadCart] = useState(false);
    
    return (  
        <GlobalContext.Provider
            value={{
                testContext,
                setTestContext,
                // dataTable
                toggleDataTable,
                setToggleDataTable,
                // order
                totalMoneyToPay,
                setTotalMoneyToPay,
                // cart
                reloadCart,
                setReloadCart,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}

export default ContextWrapper;