import React, { useState } from "react";
import GlobalContext from "./globalContext";

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
        setReloadSidebarChat,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export default ContextWrapper;
