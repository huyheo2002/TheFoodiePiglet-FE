import axios from "../utils/axios";

export const handleGetAllNotification = () => {
  const res = axios.get("/api/get-all-notification");
  return res;
};

