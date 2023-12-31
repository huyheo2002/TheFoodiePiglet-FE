import axios from "../utils/axios";

export const getAllUsers = (id) => {
  const res = axios.get(`/api/get-all-users?id=${id}`);
  return res;
};

export const getAllUsersCompact = (id) => {
  const res = axios.get(`/api/get-all-users-compact?id=${id}`);
  return res;
};

export const handleCreateUser = (data) => {
  // console.log("dataaaaa", data);

  return axios.post("/api/create-user", data);
};

export const handleUpdateUser = (data) => {
  // console.log("dataa", data);
  return axios.put("/api/edit-user", data);
};

export const handleDeleteUser = (userId, originatorId) => {
  // console.log("dataa id", userId);

  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
      originatorId: originatorId
    },
  });
};
