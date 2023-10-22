import axios from "../utils/axios";

export const handleDecoded = (accessToken) => {
    const res = axios.get(`/handle/decoded?accessToken=${accessToken}`);
    return res;
};