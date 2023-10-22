import axios from "../utils/axios";

export const getAllPermissionGroup = () => {
    const res = axios.get("api/get-all-permission-group");
    return res;
};

export const getAllPermission = () => {
    const res = axios.get("api/get-all-permission");
    return res;
};
