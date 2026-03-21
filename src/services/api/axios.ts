import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { authStore } from "../../store/authStore";

// Create axios instance with base config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
  withCredentials: true,
});

// Request interceptor - attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - handle errors and 401
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Don't logout on 401 for profile update requests, as the token may be invalidated by user data changes
      const isProfileUpdate =
        error.config?.url?.includes("/users/profile") &&
        error.config?.method?.toLowerCase() === "put";
      if (!isProfileUpdate) {
        // Clear auth state on 401
        const { logout } = authStore.getState();
        logout();
        localStorage.removeItem("auth_token");
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
