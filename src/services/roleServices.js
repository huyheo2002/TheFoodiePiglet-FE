import axios from "../utils/axios";

export const getAllRoles = (id) => {
  const res = axios.get(`api/get-all-roles?id=${id}`);
  return res;
};

export const getAllRolesWithPermission = () => {
  const res = axios.get(`api/get-all-roles-with-permission`);
  return res;
};

export const handleCreateNewRole = (data) => {
  return axios.post("api/create-new-role", data);
};

export const handleUpdateRole = (data) => {
  return axios.put("api/update-role", data);
};

export const handleDeleteRole = (id) => {
  return axios.delete("api/delete-role", {
      data: {
          id: id,
      },
  });
};

