import React, { useState } from "react";
import { Typography, Button, Input, Select } from "antd";
import { HiOutlineUserPlus, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { UserTable } from "../components/UserTable";
import { UserFormModal } from "../components/UserFormModal";
import { useUsers } from "../hooks/useUsers";
import { useDebounce } from "../../../hooks/useDebounce";
import type { UserDto, CreateUserRequest, UpdateUserRequest } from "../types";
import { ResetPasswordModal } from "../components/ResetPasswordModal";
import { handleServerErrors } from "../../../utils/form.utils";
import type { UseFormSetError } from "react-hook-form";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../../../types/api";
import type { UserFormData } from "../schemas/user.schema";
import type { ResetPasswordFormData } from "../schemas/password.schema";

const { Title } = Typography;
const { Option } = Select;

export const UsersListPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | null>(null);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [resetUser, setResetUser] = useState<UserDto | null>(null);

  const debouncedSearchTerm = useDebounce(searchValue, 500);

  const { 
    usersQuery, 
    createUserMutation, 
    updateUserMutation, 
    deleteUserMutation,
    adminResetPasswordMutation,
    useUserDetail
  } = useUsers({
    ...pagination,
    searchTerm: debouncedSearchTerm,
    isActive: isActiveFilter === null ? undefined : isActiveFilter,
  });

  const userDetailQuery = useUserDetail(selectedId);

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination({ pageNumber: page, pageSize });
  };

  const handleOpenCreate = () => {
    setSelectedId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: UserDto) => {
    setSelectedId(user.id);
    setIsModalOpen(true);
  };

  const handleOpenResetPassword = (user: UserDto) => {
    setResetUser(user);
    setIsResetModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteUserMutation.mutate(id);
  };

  const handleResetPasswordSubmit = (password: string, setError: UseFormSetError<ResetPasswordFormData>) => {
    if (resetUser) {
      adminResetPasswordMutation.mutate({ id: resetUser.id, newPassword: password }, {
        onSuccess: () => setIsResetModalOpen(false),
        onError: (error: AxiosError<ApiResponse<unknown>>) => {
          handleServerErrors(error.response?.data, setError);
        }
      });
    }
  };

  const handleFormSubmit = (data: CreateUserRequest | UpdateUserRequest, setError: UseFormSetError<UserFormData>) => {
    if (selectedId) {
      updateUserMutation.mutate({ ...data, id: selectedId } as UpdateUserRequest, {
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedId(null);
        },
        onError: (error: AxiosError<ApiResponse<unknown>>) => {
          handleServerErrors(error.response?.data, setError);
        }
      });
    } else {
      createUserMutation.mutate(data as CreateUserRequest, {
        onSuccess: () => setIsModalOpen(false),
        onError: (error: AxiosError<ApiResponse<unknown>>) => {
          handleServerErrors(error.response?.data, setError);
        }
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Title level={2} className="m-0! font-bold">
            Quản lý người dùng
          </Title>
          <p className="text-gray-500 text-sm">Danh sách và quản lý toàn bộ người dùng trong hệ thống.</p>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<HiOutlineUserPlus className="w-5 h-5 inline-block mr-1" />}
          className="h-11 px-6 rounded-lg shadow-blue-200 shadow-lg flex items-center"
          onClick={handleOpenCreate}
        >
          Thêm người dùng
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Tìm kiếm theo tên người dùng..."
          prefix={<HiOutlineMagnifyingGlass className="text-gray-400 w-5 h-5" />}
          className="h-10 rounded-lg flex-1"
          allowClear
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setPagination(prev => ({ ...prev, pageNumber: 1 }));
          }}
        />

        <Select
          placeholder="Trạng thái"
          className="h-10 w-48"
          value={isActiveFilter}
          onChange={(value) => {
            setIsActiveFilter(value);
            setPagination(prev => ({ ...prev, pageNumber: 1 }));
          }}
        >
          <Option value={null}>Tất cả trạng thái</Option>
          <Option value={true}>Đang hoạt động</Option>
          <Option value={false}>Bị khóa</Option>
        </Select>
      </div>

      <UserTable
        data={usersQuery.data?.data?.items || []}
        loading={usersQuery.isLoading}
        pagination={{
          current: pagination.pageNumber,
          pageSize: pagination.pageSize,
          total: usersQuery.data?.data?.metaData?.totalItems || 0,
        }}
        onPageChange={handlePageChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onResetPassword={handleOpenResetPassword}
      />

      <UserFormModal
        open={isModalOpen}
        initialData={userDetailQuery.data?.data || null}
        loading={createUserMutation.isPending || updateUserMutation.isPending || userDetailQuery.isFetching}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedId(null);
        }}
        onSubmit={handleFormSubmit}
      />

      <ResetPasswordModal
        open={isResetModalOpen}
        userName={resetUser?.fullName || ''}
        loading={adminResetPasswordMutation.isPending}
        onCancel={() => setIsResetModalOpen(false)}
        onSubmit={handleResetPasswordSubmit}
      />
    </div>
  );
};
