// /api/get-all-variant-compact

import axios from "../utils/axios";

export const findVariantInProduct = (id) => {
  const res = axios.get(`/api/get-all-variant-compact?id=${id}`);
  return res;
};

export const createReserveTable = (data) => {
  let res = axios.post("/api/create-reserve-tables", data)

  return res;
}