import type { UserRole } from "../../auth/types";

export interface UserDto {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  isDeleted: boolean;
  avatarUrl?: string | null;
  phoneNumber?: string | null;
  lastLoginAt?: string | null;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string | null;
  avatarUrl?: string | null;
  role: UserRole;
}

export interface UpdateProfileRequest {
  fullName: string;
  avatarUrl?: string | null;
  phoneNumber?: string | null;
}

export interface UpdateUserRequest {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  avatarUrl?: string | null;
  role: UserRole;
  isActive: boolean;
}

export interface UserQueryParams {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  isActive?: boolean;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
