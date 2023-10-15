import React, { useEffect, useState } from "react";
import GlobalContext from "./globalContext";
import useLocalStorage from "../hooks/useLocalStorage";
import * as cartServices from "../services/cartServices";

function ContextWrapper(props) {
    const [testContext, setTestContext] = useState(false);
    const [toggleDataTable, setToggleDataTable] = useState(false);
    // order
    const [totalMoneyToPay, setTotalMoneyToPay] = useState(0);
    // cart 
    const [reloadCart, setReloadCart] = useState(false);

    // value local
    const [valueUserLocal, setValueUserLocal] = useLocalStorage("dataUser", "");

    const fetchListUser = async () => {
        if (valueUserLocal) {
            const respon = await cartServices.getAllCartItemOfUser(valueUserLocal.dataUser.user.id);
            // console.log("respon", respon)
            if (respon && respon.errCode === 0) {
                if (Array.isArray(respon.listItem) && respon.listItem.length > 0) {
                    setReloadCart(true);
                } else {
                    setReloadCart(false);
                }
            }            
        } else {
            setReloadCart(false);
        }
    }

    useEffect(() => {
        fetchListUser();
    }, [])

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