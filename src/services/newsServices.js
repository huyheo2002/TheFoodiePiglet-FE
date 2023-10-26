import axios from "../utils/axios";

export const getAllNews = (id) => {
  const res = axios.get(`api/get-all-news?id=${id}`);
  return res;
};

export const getAllRolesWithPermission = () => {
  const res = axios.get(`api/get-all-roles-with-permission`);
  return res;
};

export const handleCreateNews = (data) => {
  return axios.post("/api/create-new", data);
};

export const handleUpdateNews = (data) => {
  return axios.put("/api/edit-new", data);
};

export const handleDeleteNews = (id) => {
  return axios.delete("/api/delete-new", {
      data: {
          id: id,
      },
  });
};

