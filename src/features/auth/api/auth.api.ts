import { apiClient } from '../../../lib/axios';
import type { AuthResponse, UserDto } from '../types';
import type { ApiResponse } from '../../../types/api';

export const authApi = {
  login: async (data: { username: string; password: string }) => {
    return apiClient.post<ApiResponse<AuthResponse>, ApiResponse<AuthResponse>>('/api/auth/login', data);
  },
  
  logout: async () => {
    return apiClient.post<ApiResponse<string>, ApiResponse<string>>('/api/auth/logout');
  },
  
  getMe: async () => {
    return apiClient.get<ApiResponse<UserDto>, ApiResponse<UserDto>>('/api/Users/me');
  }
};
