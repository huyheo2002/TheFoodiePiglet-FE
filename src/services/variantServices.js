// /api/get-all-variant-compact

import axios from "../utils/axios";

export const findVariantInProduct = (id) => {
  const res = axios.get(`/api/get-all-variant-compact?id=${id}`);
  return res;
};

export const findOneVariantInProduct = (id) => {
  const res = axios.get(`/api/get-one-variant-compact?id=${id}`);
  return res;
};

export const handleCreateVariant = (data) => {
  let res = axios.post("/api/create-variant-product", data)

  return res;
}

export const handleUpdateVariant = (data) => {
  let res = axios.put("/api/edit-variant-product", data)

  return res;
}

export const handleDeleteVariant = (variantId) => {

  return axios.delete("/api/delete-variant-product", {
    data: {
      id: variantId,
    },
  });
};