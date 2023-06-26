import {
  USER_LOGIN,
  USER_LOGOUT,
  FETCH_USER_LOGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
} from "../actions/userAction";

const INITIAL_STATE = {
  user: {
    username: "",
    auth: false,
    token: "",
  },
  isLoading: false,
  isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
      };

    case USER_LOGOUT:
      return {
        ...state,
      };
    case FETCH_USER_LOGIN:
      console.log("check action login", action);
      return {
        ...state,
        isLoading: true,
        isError: false,
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
      };
    case FETCH_USER_SUCCESS:
      console.log("check action login success", action);
      return {
        ...state,
        user: {
            username: action.data.username,
            token: action.data.token,
            auth: true
        },
        isLoading: false,
        isError: false,
      };

    default:
      return state;
  }
};

export default userReducer;
