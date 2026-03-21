import axiosInstance from './axios';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  data: {
    accessToken: string;
  };
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
  emailVerified?: boolean;
  id?: string;
  updatedAt?: string;
  __v?: number;
}

const authAPI = {
  register: (payload: RegisterPayload) =>
    axiosInstance.post<AuthResponse>('/auth/register', payload),

  login: (payload: LoginPayload) =>
    axiosInstance.post<AuthResponse>('/auth/login', payload),

  getCurrentUser: () =>
    axiosInstance.get<UserResponse>('/users/profile'),
};

export default authAPI;
