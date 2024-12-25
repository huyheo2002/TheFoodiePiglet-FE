import axios from "../utils/axios";

export const getAllPayment = () => {
    const response = axios.get("/api/get-all-payment");
    return response;
}

export const getRevenueData = () => {
    const response = axios.get("/api/get-revenue-data");
    return response;
}

export const getAllPaymentCompact = () => {
    const response = axios.get("/api/get-all-payment-compact");
    return response;
}

export const getAllPaymentOfUser = (userId) => {
    return axios.get(`/api/get-all-payment-of-user?userId=${userId}`)
}

export const handleCreateNewOrder = (data) => {
    return axios.post("/api/create-new-order", data);
};

export const handleUpdateOrder = (data) => {
    return axios.put("/api/edit-order", data);
};

export const handleDeletePayment = (id) => {
    return axios.delete("/api/delete-payment", {
        data: {
            paymentId: id,
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
