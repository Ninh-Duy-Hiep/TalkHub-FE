import React, { useEffect, useState, useMemo } from 'react';
import { Modal, Form, Input, Select, Switch, Upload, Avatar } from 'antd';
import { LoadingOutlined, PlusOutlined, UserOutlined, CloseCircleFilled } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { useForm, Controller, useWatch } from 'react-hook-form';
import type { UseFormSetError, Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, type UserFormData } from '../schemas/user.schema';
import type { UserDto, CreateUserRequest, UpdateUserRequest } from '../types';
import { UserRole } from '../../auth/types';
import { validateImageBeforeUpload, handleImageUpload, getFullImageUrl } from '../../../utils/media.utils';

interface UserFormModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (data: CreateUserRequest | UpdateUserRequest, setError: UseFormSetError<UserFormData>) => void;
  initialData?: UserDto | null;
  loading?: boolean;
}

interface FormFieldConfig {
  name: keyof UserFormData;
  label: string;
  placeholder: string;
  required: boolean;
  isPassword?: boolean;
}

const AvatarPreview: React.FC<{ 
  control: Control<UserFormData>; 
  uploadLoading: boolean;
  previewUrl: string | null;
  onRemove: (e: React.MouseEvent) => void;
}> = ({ control, uploadLoading, previewUrl, onRemove }) => {
  const avatarUrl = useWatch({
    control,
    name: 'avatarUrl',
  });

  const displayUrl = previewUrl || getFullImageUrl(avatarUrl);

  return (
    <div className="relative group">
      {displayUrl ? (
        <>
          <Avatar
            size={100}
            src={displayUrl}
            icon={uploadLoading ? <LoadingOutlined /> : <UserOutlined />}
            className="border-2 border-gray-100 shadow-sm"
          />
          {!uploadLoading && (
            <div 
              className="absolute -top-1 -right-1 z-10 cursor-pointer text-red-500 hover:text-red-600 transition-colors bg-white rounded-full leading-none"
              onClick={onRemove}
            >
              <CloseCircleFilled style={{ fontSize: '20px' }} />
            </div>
          )}
        </>
      ) : (
        <Avatar
          size={100}
          icon={uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
          className="border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
        />
      )}
      {uploadLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full">
          <LoadingOutlined className="text-blue-500 text-xl" />
        </div>
      ) : null}
    </div>
  );
};

export const UserFormModal: React.FC<UserFormModalProps> = ({
  open,
  onCancel,
  onSubmit,
  initialData,
  loading = false,
}) => {
  const isEdit = !!initialData;
  const [internalLoading, setInternalLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: '',
      email: '',
      username: '',
      password: '',
      phoneNumber: '',
      avatarUrl: '',
      role: UserRole.Staff,
      isActive: true,
    },
  });

  useEffect(() => {
    if (open) {
      reset(
        initialData
          ? {
              fullName: initialData.fullName,
              email: initialData.email,
              role: initialData.role,
              isActive: initialData.isActive,
              phoneNumber: initialData.phoneNumber || '',
              avatarUrl: initialData.avatarUrl || '',
            }
          : {
              fullName: '',
              email: '',
              username: '',
              password: '',
              phoneNumber: '',
              avatarUrl: '',
              role: UserRole.Staff,
              isActive: true,
            }
      );
    }
  }, [open, initialData, reset]);

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setValue('avatarUrl', '');
  };

  const handleCancel = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    onCancel();
  };

  const onFormSubmit = async (data: UserFormData) => {
    setInternalLoading(true);
    try {
      let finalAvatarUrl = data.avatarUrl;

      if (selectedFile) {
        const uploadedUrl = await handleImageUpload(selectedFile);
        if (uploadedUrl) {
          finalAvatarUrl = uploadedUrl;
        } else {
          setInternalLoading(false);
          return;
        }
      }

      const requestData = {
        ...data,
        avatarUrl: finalAvatarUrl,
      };

      if (isEdit && initialData) {
        onSubmit({
          id: initialData.id,
          fullName: requestData.fullName,
          email: requestData.email,
          phoneNumber: requestData.phoneNumber,
          avatarUrl: requestData.avatarUrl,
          role: requestData.role,
          isActive: requestData.isActive,
        }, setError);
      } else {
        onSubmit(requestData as CreateUserRequest, setError);
      }
    } finally {
      setInternalLoading(false);
    }
  };

  const onUploadChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.originFileObj) {
      const file = info.file.originFileObj as File;
      setSelectedFile(file);
      
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const formFields = useMemo<FormFieldConfig[]>(() => [
    { name: 'fullName', label: 'Họ và tên', placeholder: 'VD: Nguyễn Văn A', required: true },
    { name: 'email', label: 'Email', placeholder: 'example@talkhub.vn', required: true },
    ...(!isEdit ? [
      { name: 'username', label: 'Tên đăng nhập', placeholder: 'Username', required: true } as FormFieldConfig,
      { name: 'password', label: 'Mật khẩu', placeholder: '********', required: true, isPassword: true } as FormFieldConfig,
    ] : []),
    { name: 'phoneNumber', label: 'Số điện thoại', placeholder: 'Số điện thoại', required: false },
  ], [isEdit]);

  return (
    <Modal
      open={open}
      title={<span className="text-lg font-semibold">{isEdit ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</span>}
      onCancel={handleCancel}
      onOk={handleSubmit(onFormSubmit)}
      confirmLoading={loading || internalLoading}
      okText={isEdit ? 'Cập nhật' : 'Thêm mới'}
      cancelText="Hủy"
      width={500}
      centered
      destroyOnClose
      className="user-form-modal"
    >
      <Form layout="vertical" className="mt-6">
        <div className="flex flex-col items-center mb-8">
          <Upload
            name="avatar"
            accept=".jpg,.jpeg,.png,.webp"
            showUploadList={false}
            beforeUpload={validateImageBeforeUpload}
            onChange={onUploadChange}
            customRequest={({ onSuccess }) => setTimeout(() => onSuccess?.("ok"), 0)}
            className="cursor-pointer"
          >
            <AvatarPreview 
              control={control} 
              uploadLoading={internalLoading} 
              previewUrl={previewUrl} 
              onRemove={handleRemoveImage}
            />
          </Upload>
        </div>

        <div className="space-y-1">
          {formFields.map((field) => (
            <Form.Item
              key={field.name}
              label={<span className="font-medium text-gray-700">{field.label}</span>}
              required={field.required}
              validateStatus={errors[field.name] ? 'error' : ''}
              help={errors[field.name]?.message}
              className="mb-4"
            >
              <Controller
                name={field.name}
                control={control}
                render={({ field: inputProps }) => 
                  field.isPassword ? (
                    <Input.Password 
                      {...inputProps} 
                      value={inputProps.value as string} 
                      placeholder={field.placeholder} 
                      className="h-10 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500" 
                    />
                  ) : (
                    <Input 
                      {...inputProps} 
                      value={inputProps.value as string} 
                      placeholder={field.placeholder} 
                      className="h-10 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500" 
                    />
                  )
                }
              />
            </Form.Item>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 mt-2">
          <Form.Item label={<span className="font-medium text-gray-700">Vai trò</span>} required>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select {...field} className="h-10 w-full" dropdownClassName="rounded-lg">
                  <Select.Option value={UserRole.Admin}>Quản trị viên</Select.Option>
                  <Select.Option value={UserRole.Staff}>Nhân viên</Select.Option>
                </Select>
              )}
            />
          </Form.Item>

          <Form.Item label={<span className="font-medium text-gray-700">Trạng thái</span>}>
            <div className="flex items-center h-10 bg-gray-50 px-3 rounded-lg border border-gray-100">
              <Controller
                name="isActive"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Switch checked={value as boolean} onChange={onChange} size="small" />
                )}
              />
              <span className="ml-3 text-gray-600 text-sm font-medium">Đang hoạt động</span>
            </div>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
