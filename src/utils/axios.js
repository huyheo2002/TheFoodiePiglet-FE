import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', }
});

instance.interceptors.request.use(
  (config) => {
    const storedData = localStorage.getItem("dataUser");
    let token;

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        token = parsedData?.token;
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found or token is undefined");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.defaults.withCredentials = true;

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
