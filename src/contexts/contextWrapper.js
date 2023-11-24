import React, { useEffect, useState } from "react";
import GlobalContext from "./globalContext";
import useLocalStorage from "../hooks/useLocalStorage";
import * as cartServices from "../services/cartServices";
import * as commonServices from "../services/commonServices";


function ContextWrapper(props) {
    const [testContext, setTestContext] = useState(false);
    const [toggleDataTable, setToggleDataTable] = useState(false);
    // order
    const [totalMoneyToPay, setTotalMoneyToPay] = useState(0);
    // cart 
    const [reloadCart, setReloadCart] = useState(false);
    const [reloadItemInCart, setReloadItemInCart] = useState(false);

    // payment
    const [paymentOnlineSuccess, setPaymentOnlineSuccess] = useState(false);
    const [showCongrat, setShowCongrat] = useState(false);
    const [reloadNotify, setReloadNotify] = useState(false);
    const [idChatRoom, setIdChatRoom] = useState(null);
    const [imageChatRoom, setImageChatRoom] = useState(null);
    const [reloadSidebarChat, setReloadSidebarChat] = useState(false);
    
    // value local
    const [valueUserLocal, setValueUserLocal] = useLocalStorage("dataUser", "");

    const fetchListUser = async () => {
        if(valueUserLocal) {
            const responDecodedUser = await commonServices.handleDecoded(valueUserLocal && valueUserLocal.token);
            if (responDecodedUser && responDecodedUser.errCode === 0) {
                let dataUser = responDecodedUser.decoded.user.id ?? null;
                const respon = await cartServices.getAllCartItemOfUser(dataUser);
                // console.log("respon", respon)
                if (respon && respon.errCode === 0) {
                    if (Array.isArray(respon.listItem) && respon.listItem.length > 0) {
                        setReloadCart(true);
                    } else {
                        setReloadCart(false);
                    }
                }            
            }
        } else {
            setReloadCart(false);
        }

        
    }

    useEffect(() => {
        fetchListUser();
    }, [valueUserLocal])

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
                reloadItemInCart,
                setReloadItemInCart,
                // payment
                paymentOnlineSuccess,
                setPaymentOnlineSuccess,
                showCongrat,
                setShowCongrat,
                reloadNotify,
                setReloadNotify,
                idChatRoom,
                setIdChatRoom,
                imageChatRoom,
                setImageChatRoom,
                reloadSidebarChat,
                setReloadSidebarChat
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}

export default ContextWrapper;