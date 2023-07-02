import axios from "../utils/axios";

export const handleLogin = (username, password) => {
  const res = axios.post("/api/login", {
    username: username,
    password: password,
  });
  return res;
};

export const getAllUsers = (id) => {
  const res = axios.get(`/api/get-all-users?id=${id}`)
  return res;
}
