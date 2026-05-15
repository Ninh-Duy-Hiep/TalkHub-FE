export const UserRole = {
  Admin: 1,
  Staff: 2,
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

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

export interface AuthResponse {
  username: string;
  fullName: string;
}


