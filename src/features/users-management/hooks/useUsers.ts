import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../api/users.api";
import type { UserQueryParams, CreateUserRequest, UpdateUserRequest } from "../types";
import { message } from "antd";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../../../types/api";

export const useUsers = (params: UserQueryParams) => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["users", params],
    queryFn: () => usersApi.getUsers(params),
  });

  const createUserMutation = useMutation({
    mutationFn: (data: CreateUserRequest) => usersApi.createUser(data),
    onSuccess: (res) => {
      if (res.success) {
        message.success("Tạo người dùng thành công");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (error: AxiosError<ApiResponse>) => {
      message.error(error.response?.data?.message || "Có lỗi xảy ra khi tạo người dùng");
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (data: UpdateUserRequest) => usersApi.updateUser(data),
    onSuccess: (res) => {
      if (res.success) {
        message.success("Cập nhật người dùng thành công");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (error: AxiosError<ApiResponse>) => {
      message.error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật người dùng");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: (res) => {
      if (res.success) {
        message.success("Xóa người dùng thành công");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (error: AxiosError<ApiResponse>) => {
      message.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa người dùng");
    },
  });

  const adminResetPasswordMutation = useMutation({
    mutationFn: ({ id, newPassword }: { id: string; newPassword: string }) =>
      usersApi.adminResetPassword(id, newPassword),
    onSuccess: (res) => {
      if (res.success) {
        message.success("Đặt lại mật khẩu thành công");
      }
    },
    onError: (error: AxiosError<ApiResponse>) => {
      message.error(error.response?.data?.message || "Có lỗi xảy ra khi đặt lại mật khẩu");
    },
  });

  const useUserDetail = (id: string | null) => {
    return useQuery({
      queryKey: ["user", id],
      queryFn: () => usersApi.getUser(id!),
      enabled: !!id,
    });
  };

  return {
    usersQuery,
    createUserMutation,
    updateUserMutation,
    deleteUserMutation,
    adminResetPasswordMutation,
    useUserDetail,
  };
};
