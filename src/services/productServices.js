import axios from "../utils/axios";

export const getAllProduct = () => {
  const respon = axios.get("/api/get-all-product");
  return respon;
}

export const getAllProductCompact = () => {
  const respon = axios.get("/api/get-all-product-compact");
  return respon;
}

export const findOneProduct = (id) => {
  const respon = axios.get(`/api/find-one-product?id=${id}`);
  return respon;
}

export const handleCreateProduct = (data) => {
  return axios.post("/api/create-product", data);
};

export const handleUpdateProduct = (data) => {
  // console.log("dataa", data);
  return axios.put("/api/edit-product", data);
};

export const handleDeleteProduct = (prodId) => {
  return axios.delete("/api/delete-product", {
    data: {
      id: prodId,
    },
  });
};
