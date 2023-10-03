import axios from "../utils/axios";

export const getAllGenres = () => {
  const res = axios.get(`api/get-all-genres`);
  return res;
};
