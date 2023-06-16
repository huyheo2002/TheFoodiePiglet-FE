import React, { useState } from "react";
import GlobalContext from "./globalContext";

function ContextWrapper(props) {
    const [testContext, setTestContext] = useState(false);
    
    return (  
        <GlobalContext.Provider
            value={{
                testContext,
                setTestContext,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}

export default ContextWrapper;