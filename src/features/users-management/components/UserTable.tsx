import React, { useState, useMemo } from 'react';
import { Table, Tag, Space, Button, Avatar, Tooltip } from 'antd';
import { LuUser, LuTrash2, LuKey } from "react-icons/lu";
import { MdModeEdit } from "react-icons/md";
import type { ColumnsType } from 'antd/es/table';
import type { UserDto } from '../types';
import { UserRole } from '../../auth/types';
import { ConfirmModal } from '../../../components/ConfirmModal';

interface UserTableProps {
  data: UserDto[];
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  onPageChange: (page: number, pageSize: number) => void;
  onEdit: (user: UserDto) => void;
  onDelete: (id: string) => void;
  onResetPassword: (user: UserDto) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  data,
  loading,
  pagination,
  onPageChange,
  onEdit,
  onDelete,
  onResetPassword,
}) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns: ColumnsType<UserDto> = useMemo(() => [
    {
      title: 'Người dùng',
      key: 'user',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar size={45} src={import.meta.env.VITE_API_URL + record.avatarUrl || undefined} icon={<LuUser />} className="bg-blue-100 text-blue-600 shrink-0" />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 leading-tight">{record.fullName}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role: UserRole) => {
        const isAdmin = role === UserRole.Admin;
        return (
          <Tag color={isAdmin ? 'blue' : ''} className="rounded-full px-3">
            {isAdmin ? 'Quản trị viên' : 'Nhân viên'}
          </Tag>
        );
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <Tag color={record.isActive ? 'green' : 'red'} bordered={false} className="flex items-center gap-1 w-fit">
          <span className={`w-1.5 h-1.5 rounded-full ${record.isActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
          {record.isActive ? 'Hoạt động' : 'Bị khóa'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      align: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa">
            <Button 
              type="text" 
              icon={<MdModeEdit className="text-blue-600 w-5 h-5" />} 
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Đặt lại mật khẩu">
            <Button 
              type="text" 
              icon={<LuKey className="text-orange-500 w-5 h-5" />} 
              onClick={() => onResetPassword(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button 
              type="text" 
              danger 
              icon={<LuTrash2 className="w-5 h-5" />} 
              onClick={() => setDeleteId(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ], [onEdit, onResetPassword]);

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          onChange: onPageChange,
          showSizeChanger: true,
          pageSizeOptions: ['10', '15', '20', '50'],
          style: { marginRight: '20px' },
        }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      />

      <ConfirmModal
        open={!!deleteId}
        title="Xóa người dùng"
        description="Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác."
        onConfirm={() => {
          if (deleteId) onDelete(deleteId);
          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
        type="danger"
      />
    </>
  );
};
