import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', }
  
});

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("dataUser");

//     if (token && !isTokenExpired(token)) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

instance.defaults.withCredentials = true;

// const logRequestConfig = (config) => {
//   console.log("Request Config:", config);
//   return config;
// };
// instance.interceptors.request.use(logRequestConfig);

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
