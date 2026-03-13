import axios from "axios";

//  Base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer <Authorization_token>",
  },
  timeout: 15000,
  withCredentials: true,
});

export default api;
