import {
  USER_LOGOUT,
  FETCH_USER_LOGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  USER_NOLOGIN,
} from "../actions/userAction";

const INITIAL_STATE = {
  user: {
    username: "",
    auth: false,
    token: "",
  },
  isLoading: false,
  isError: false,
  isLockFeatures: true,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      console.log("check action login", action);
      return {
        ...state,
        isLoading: true,
        isError: false,
        isLockFeatures: true,
      };
    case FETCH_USER_ERROR:
      console.log("check action login err", action);
      return {
        ...state,
        user: {
          auth: false,
        },
        isLoading: false,
        isError: true,
        isLockFeatures: true,
      };
    case FETCH_USER_SUCCESS:
      console.log("check action login success", action);
      return {
        ...state,
        user: {
          username: action.data.username,
          token: action.data.token,
          auth: true,
        },
        isLoading: false,
        isError: false,
        isLockFeatures: false,
      };
    case USER_LOGOUT:
      localStorage.removeItem("dataUser");
      console.log("check action USER_LOGOUT", action);
      return {
        ...state,
        user: {
          username: "",
          token: "",
          auth: false,
        },
        isLockFeatures: true,
      };
    case USER_NOLOGIN:
      localStorage.removeItem("dataUser");
      console.log("check action USER_NOLOGIN", action);
      return {
        ...state,
        isLoading: false,
        isError: false,       
        isLockFeatures: true, 
      };

    default:
      return state;
  }
};

export default userReducer;
