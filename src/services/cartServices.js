import axios from "../utils/axios";

export const getAllCart = () => {
    const respon = axios.get("/api/get-all-cart");
    return respon;
}

export const getAllCartItemOfUser = (userId) => {
    const respon = axios.get(`/api/get-all-cartItem-of-user?userId=${userId}`);
    return respon;
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
