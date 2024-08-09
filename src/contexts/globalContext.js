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

  reloadItemInCart: false,
  setReloadItemInCart: () => {},

  // check payment online success
  paymentOnlineSuccess: false,
  setPaymentOnlineSuccess: () => {},

  // congrat
  showCongrat: false,
  setShowCongrat: () => {},

  // reload notify
  reloadNotify: false,
  setReloadNotify: () => {},

  // id chat room
  idChatRoom: null,
  setIdChatRoom: () => {},

  // image chatRoom
  imageChatRoom: null,
  setImageChatRoom: () => {},

  // reload sidebarchat
  reloadSidebarChat: false,
  setReloadSidebarChat: () => {},
});

export default GlobalContext;
