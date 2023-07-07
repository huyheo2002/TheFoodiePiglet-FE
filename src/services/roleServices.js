import axios from "../utils/axios";

export const getAllRoles = (id) => {
  const res = axios.get(`api/get-all-roles?id=${id}`);
  return res;
};
