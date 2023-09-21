import axios from "../utils/axios";

export const getAllTables = (id) => {
  const res = axios.get(`/api/get-all-tables?id=${id}`);
  return res;
};

export const createReserveTable = (data) => {
  let res = axios.post("/api/create-reserve-tables", data)

  return res;
}