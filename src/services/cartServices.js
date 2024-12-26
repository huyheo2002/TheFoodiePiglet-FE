import axios from "../utils/axios";

export const getAllCart = () => {
    const response = axios.get("/api/get-all-cart");
    return response;
}

export const getAllCartItemOfUser = (userId) => {
    const response = axios.get(`/api/get-all-cartItem-of-user?userId=${userId}`);
    return response;
}

export const handleAddToCart = (data) => {
    return axios.post("/api/add-to-cart", data);
};

export const handleDeleteItemInCart = (id) => {
    return axios.delete("/api/delete-item-in-cart", {
        data: {
            id: id,
        },
    });
};

export const handleRefreshCart = (userId) => {
    return axios.delete("/api/refresh-cart", {
        data: {
            userId: userId,
        },
    });
};
