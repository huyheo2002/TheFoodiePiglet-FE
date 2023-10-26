import axios from "../utils/axios";

export const getAllTables = (id) => {
  const res = axios.get(`/api/get-all-tables?id=${id}`);
  return res;
};

export const getAllReserveTable = () => {
  const res = axios.get(`/api/get-all-reserve-tables`);
  return res;
};

export const createReserveTable = (data) => {
  let res = axios.post("/api/create-reserve-tables", data)

  return res;
}

export const updateReserveTable = (data) => {
  return axios.put("/api/update-reserve-tables", data);
};


export const deleteReserveTable = (id) => {
  return axios.delete("/api/delete-reserve-tables", {
      data: {
          id: id,
      },
  });
};