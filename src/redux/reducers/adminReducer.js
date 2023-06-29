import {
  SHOW_SIDEBAR_MANAGER,
  HIDE_SIDEBAR_MANAGER,
} from "../actions/adminAction";

const INITIAL_STATE = {
  toggleSidebar: true,
};

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_SIDEBAR_MANAGER:
      console.log("check action show sidebar", action);
      return {
        ...state,
        toggleSidebar: true,
      };
    case HIDE_SIDEBAR_MANAGER:
      console.log("check action hide sidebar", action);
      return {
        ...state,
        toggleSidebar: false,
      };
    default:
      return state;
  }
};

export default adminReducer;
