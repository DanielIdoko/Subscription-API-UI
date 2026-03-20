import axiosInstance from './axios';

export interface UpdateProfilePayload {
  name: string;
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
}

export interface DeleteAccountResponse {
  message: string;
}

const userAPI = {
  updateProfile: (payload: UpdateProfilePayload) =>
    axiosInstance.put<UserResponse>('/users/profile', payload),

  deleteAccount: () =>
    axiosInstance.delete<DeleteAccountResponse>('/users'),
};

export default userAPI;
