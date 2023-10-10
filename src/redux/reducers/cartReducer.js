import { CHECK_LOGIN, ADD_TO_CART, REMOVE_ITEM_IN_CART, REFRESH_CART, ADD_TO_CART_ERROR, REMOVE_ERROR } from "../actions/cartAction";

const INITIAL_STATE = {
    product: {
        dataProduct: {},
        auth: false,
        message: "",
    },
    isLoading: false,
    isError: false,
    isLockFeatures: true,
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHECK_LOGIN:
            console.log("check action login", action);
            return {
                ...state,
                isLoading: true,
                isError: false,
                isLockFeatures: true,
            };
        case ADD_TO_CART:
            console.log("check action login", action);
            return {
                ...state,
                product: {
                    dataProduct: {},
                    auth: false,
                    message: "",
                },
                isLoading: true,
                isError: false,
                isLockFeatures: true,
            };
        case REMOVE_ITEM_IN_CART:
            console.log("check action login", action);
            return {
                ...state,
                isLoading: true,
                isError: false,
                isLockFeatures: true,
            };
        case REFRESH_CART:
            console.log("check action login err", action);
            return {
                ...state,
                isLoading: true,
                isError: false,
                isLockFeatures: true,
            };
        default:
            return state;
    }
};

export default cartReducer;