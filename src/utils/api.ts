import axios from "axios";
const API_URL = import.meta.env.BACKEND_API_URL;

//  Base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
  withCredentials: true,
});

export default api;