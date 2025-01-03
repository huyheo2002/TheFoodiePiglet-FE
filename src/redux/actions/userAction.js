import * as authServices from "../../services/authServices";

export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const USER_LOGOUT = "USER_LOGOUT";
// when user no login lock features
export const USER_NOLOGIN = "USER_NOLOGIN";
export const USER_LOGIN_GOOGLE = "USER_LOGIN_GOOGLE";

export const handleLoginRedux = (username, password) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_USER_LOGIN });

    try {
      const res = await authServices.handleLogin(username, password);
      if (res && res.errCode === 0) {
        dispatch({
          type: FETCH_USER_SUCCESS,
          data: {
            username: username,
            token: res.accessToken,
          },
        });
      } else {
        dispatch({
          type: FETCH_USER_ERROR,
        });
      }
    } catch (error) {
      console.error("error", error);
    }
  };
};

export const handleLogoutRedux = () => {
  return (dispatch, getState) => {
    dispatch({
      type: USER_LOGOUT
    })
  }
}

export const handleNoLoginRedux = () => {
  return (dispatch, getState) => {
    dispatch({
      type: USER_NOLOGIN
    })
  }
}

export const handleLoginGoogleRedux = (userId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: USER_LOGIN_GOOGLE
    })

    try {
      const res = await authServices.handleLoginGoogle(userId);
      if (res && res.errCode === 0) {
        dispatch({
          type: FETCH_USER_SUCCESS,
          data: {
            token: res.accessToken,
          },
        });
      } else {
        dispatch({
          type: FETCH_USER_ERROR,
        });
      }
    } catch (error) {
      console.error("error", error);
    }
  }
}
