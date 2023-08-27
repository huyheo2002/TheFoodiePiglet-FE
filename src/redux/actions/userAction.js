import * as userServices from "../../services/userServices";

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
      const res = await userServices.handleLogin(username, password);
      console.log("respon redux", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: FETCH_USER_SUCCESS,
          data: {            
            username: username,
            role: res.user?.roleId,
            address: res.user?.address,
            avatar: res.user?.avatar,
            email: res.user?.email,
            gender: res.user?.gender,
            name: res.user?.name,
            phone: res.user?.phone,
            token: res.message,
          },
        });
      } else {
        dispatch({
          type: FETCH_USER_ERROR,
        });
      }
    } catch (error) {
      console.log("error", error);
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
      const res = await userServices.handleLoginGoogle(userId);
      console.log("respon login google redux", res);
      if (res && res.errCode === 0) {
        dispatch({
          type: FETCH_USER_SUCCESS,
          data: {
            username: res.user?.username,
            role: res.user?.roleId,
            address: res.user?.address,
            avatar: res.user?.avatar,
            email: res.user?.email,
            gender: res.user?.gender,
            name: res.user?.name,
            phone: res.user?.phone,
            token: res.message,
          },
        });
      } else {
        dispatch({
          type: FETCH_USER_ERROR,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}
