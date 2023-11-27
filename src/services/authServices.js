import axios from "../utils/axios";

export const handleLogin = (username, password) => {
    const res = axios.post("/api/login", {
        username: username,
        password: password,
    });
    return res;
};

export const handleLoginGoogle = (userId) => {
    const res = axios.get(`/login-success/${userId}`);
    return res;
};

export const handleChangePassword = (data) => {
    return axios.put("/api/change-password", data);
};

export const handleFotgotPassword = (data) => {
    const res = axios.post(`/api-forgot-password`, data);
    return res;
};

export const handleResetPassword = (data) => {
    const res = axios.post(`/api-reset-password`, data);
    return res;
};