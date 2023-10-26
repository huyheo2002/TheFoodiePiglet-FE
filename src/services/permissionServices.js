import axios from "../utils/axios";

export const getAllPermissionGroup = () => {
    const res = axios.get("api/get-all-permission-group");
    return res;
};

export const getAllPermission = () => {
    const res = axios.get("api/get-all-permission");
    return res;
};

export const handleCreatePermissionGroup = (data) => {
    return axios.post("api/create-permission-group", data);
};

export const handleUpdatePermissionGroup = (data) => {
    return axios.put("api/update-permission-group", data);
};

export const handleDeletePermissionGroup = (id) => {
    return axios.delete("api/delete-permission-group", {
        data: {
            id: id,
        },
    });
};

export const handleCreatePermission = (data) => {
    return axios.post("api/create-permission", data);
};

export const handleUpdatePermission = (data) => {
    return axios.put("api/update-permission", data);
};

export const handleDeletePermission = (id) => {
    return axios.delete("api/delete-permission", {
        data: {
            id: id,
        },
    });
};

