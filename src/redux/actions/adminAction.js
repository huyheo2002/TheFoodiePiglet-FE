export const SHOW_SIDEBAR_MANAGER = "SHOW_SIDEBAR_MANAGER";
export const HIDE_SIDEBAR_MANAGER = "HIDE_SIDEBAR_MANAGER";

export const handleOpenSidebar = () => {
  return (dispatch, getState) => {
    dispatch({
      type: SHOW_SIDEBAR_MANAGER,
    });
  };
};

export const handleCloseSidebar = () => {
  return (dispatch, getState) => {
    dispatch({
      type: HIDE_SIDEBAR_MANAGER,
    });
  };
};
