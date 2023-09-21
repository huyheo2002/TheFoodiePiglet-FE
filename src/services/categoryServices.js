import axios from "../utils/axios";

export const getAllorOneCategoryOfProduct = (id) => {
    return axios.get(`/api/get-all-category?id=${id}`)
}