import React, { useState } from "react";
import GlobalContext from "./globalContext";

function ContextWrapper(props) {
    const [testContext, setTestContext] = useState(false);
    const [toggleDataTable, setToggleDataTable] = useState(false);

    
    return (  
        <GlobalContext.Provider
            value={{
                testContext,
                setTestContext,
                // dataTable
                toggleDataTable,
                setToggleDataTable,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}

export default ContextWrapper;