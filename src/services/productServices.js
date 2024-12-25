import axios from "../utils/axios";

export const getAllProduct = () => {
  const response = axios.get("/api/get-all-product");
  return response;
}

export const getAllProductCompact = () => {
  const response = axios.get("/api/get-all-product-compact");
  return response;
}

export const findOneProduct = (id) => {
  const response = axios.get(`/api/find-one-product?id=${id}`);
  return response;
}

export const handleGetProductCountByCategories = () => {
  const response = axios.get(`/api/get-product-count-by-categories`);
  return response;
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
