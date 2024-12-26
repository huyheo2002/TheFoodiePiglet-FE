import axios from "../utils/axios";

export const getAllProduct = () => {
  const responsese = axios.get("/api/get-all-product");
  return responsese;
}

export const getAllProductCompact = () => {
  const responsese = axios.get("/api/get-all-product-compact");
  return responsese;
}

export const findOneProduct = (id) => {
  const responsese = axios.get(`/api/find-one-product?id=${id}`);
  return responsese;
}

export const handleGetProductCountByCategories = () => {
  const responsese = axios.get(`/api/get-product-count-by-categories`);
  return responsese;
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
