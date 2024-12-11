import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Replace with your backend's base URL
  timeout: 10000, // Optional: set timeout
  headers: {
    'Content-Type': 'application/json', // Default for JSON requests
    'Accept': 'application/json', // Specify expected response format
  },
});

export default axiosInstance;
