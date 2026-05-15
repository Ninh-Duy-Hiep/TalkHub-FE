import React from "react";
import { Modal, Form, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import type { UseFormSetError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, type ResetPasswordFormData } from "../schemas/password.schema";
interface Props {
  open: boolean;
  userName: string;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (password: string, setError: UseFormSetError<ResetPasswordFormData>) => void;
}

export const ResetPasswordModal: React.FC<Props> = ({ open, userName, loading, onCancel, onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onFormSubmit = (data: ResetPasswordFormData) => {
    onSubmit(data.password, setError);
    reset();
  };

  return (
    <Modal
      open={open}
      title={<span className="text-lg font-bold">Đặt lại mật khẩu cho {userName}</span>}
      onCancel={() => {
        reset();
        onCancel();
      }}
      onOk={handleSubmit(onFormSubmit)}
      confirmLoading={loading}
      okText="Đặt lại"
      cancelText="Hủy"
      centered
      destroyOnClose
    >
      <Form layout="vertical" className="mt-4">
        <Form.Item
          label="Mật khẩu mới"
          required
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Nhập mật khẩu mới" className="h-10 rounded-lg" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          required
          validateStatus={errors.confirmPassword ? "error" : ""}
          help={errors.confirmPassword?.message}
        >
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Xác nhận mật khẩu mới" className="h-10 rounded-lg" />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
