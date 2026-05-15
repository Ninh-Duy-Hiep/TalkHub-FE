import { apiClient } from "../../../lib/axios";
import type { ApiResponse, PaginatedResponse } from "../../../types/api";
import type { 
  UserDto, 
  CreateUserRequest, 
  UpdateProfileRequest, 
  UserQueryParams,
  ChangePasswordRequest,
  UpdateUserRequest 
} from "../types";

export const usersApi = {
  getUsers: async (params: UserQueryParams) => {
    return apiClient.get<PaginatedResponse<UserDto>, PaginatedResponse<UserDto>>("/api/Users", {
      params,
    });
  },

  getUser: async (id: string) => {
    return apiClient.get<ApiResponse<UserDto>, ApiResponse<UserDto>>(`/api/Users/${id}`);
  },

  createUser: async (data: CreateUserRequest) => {
    return apiClient.post<ApiResponse<string>, ApiResponse<string>>("/api/Users", data);
  },

  updateProfile: async (data: UpdateProfileRequest) => {
    return apiClient.put<ApiResponse<string>, ApiResponse<string>>("/api/Users/profile", data);
  },

  updateUser: async (data: UpdateUserRequest) => {
    return apiClient.put<ApiResponse<string>, ApiResponse<string>>(`/api/Users/${data.id}`, data);
  },

  changePassword: async (data: ChangePasswordRequest) => {
    return apiClient.put<ApiResponse<string>, ApiResponse<string>>("/api/Users/change-password", data);
  },

  deleteUser: async (id: string) => {
    return apiClient.delete<ApiResponse<string>, ApiResponse<string>>(`/api/Users/${id}`);
  },

  adminResetPassword: async (id: string, newPassword: string) => {
    return apiClient.put<ApiResponse<string>, ApiResponse<string>>(`/api/Users/${id}/reset-password`, newPassword, {
      headers: { 'Content-Type': 'application/json' }
    });
  },
};
