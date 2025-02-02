import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ytbackend.expressme.in/api/v1",
  // timeout: 8000
  // "http://localhost:8000/api/v1",  
  // "https://metube-n3vg.onrender.com/api/v1",
});

axiosInstance.interceptors.request.use((config) => {
  // Retrieve the token from local storage
  const token = localStorage.getItem("accessToken");
  if (token) {
    // Set the Authorization header if the token exists
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Set default Content-Type header if not already set
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  // Set Accept header
  config.headers['Accept'] = 'application/json';
  return config;
}, (error) => {
  // Handle the error
  return Promise.reject(error);
}); 

export default axiosInstance;
