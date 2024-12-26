import * as cartServices from "../../services/cartServices";

export const CHECK_LOGIN = "CHECK_LOGIN";
export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_TO_CART_ERROR = "ADD_TO_CART_ERROR";
export const REMOVE_ITEM_IN_CART = "REMOVE_ITEM_IN_CART";
export const REFRESH_CART = "REFRESH_CART";
export const REMOVE_ERROR = "REMOVE_ERROR";

export const handleAddToCartRedux = (data) => {
    return async (dispatch, getState) => {
        dispatch({ type: CHECK_LOGIN });

        try {
            const response = await cartServices.handleAddToCart(data);
            if (response && response.errCode === 0) {
                dispatch({
                    type: ADD_TO_CART,
                    data: {
                        product: response.dataCartItem,
                        auth: true,
                        message: response.message,
                    },
                })
            } else {
                dispatch({
                    type: ADD_TO_CART_ERROR,
                })
            }
        } catch (error) {
            console.error("error", error);
        }
    }
}

export const handleRemoveItemInCartRedux = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: CHECK_LOGIN });

        try {
            const response = await cartServices.handleDeleteItemInCart(id);
            if (response && response.errCode === 0) {
                dispatch({
                    type: REMOVE_ITEM_IN_CART,
                    data: {
                        auth: true,
                        message: response.message,
                    },
                })
            } else {
                dispatch({
                    type: REMOVE_ERROR,
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export const handleRefreshCartRedux = (userId) => {
    return async (dispatch, getState) => {
        dispatch({ type: CHECK_LOGIN });

        try {
            const response = await cartServices.handleRefreshCart(userId);
            if (response && response.errCode === 0) {
                dispatch({
                    type: REFRESH_CART,
                    data: {
                        auth: true,
                        message: response.message,
                    },
                })
            } else {
                dispatch({
                    type: REMOVE_ERROR,
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
}