import React from 'react';
import { Modal, Button } from 'antd';
import { LuTriangleAlert, LuInfo } from "react-icons/lu";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'info';
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  type = 'danger',
  loading = false,
}) => {
  const isDanger = type === 'danger';

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closable={false}
      centered
      width={400}
      className="confirm-modal"
    >
      <div className="flex flex-col items-center p-4 text-center">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
          isDanger ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
        }`}>
          {isDanger ? (
            <LuTriangleAlert className="w-8 h-8" />
          ) : (
            <LuInfo className="w-8 h-8" />
          )}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 mb-8">{description}</p>
        
        <div className="flex gap-3 w-full">
          <Button 
            className="flex-1 h-11 rounded-lg font-medium" 
            onClick={onCancel}
          >
            Hủy bỏ
          </Button>
          <Button 
            type="primary" 
            danger={isDanger}
            className="flex-1 h-11 rounded-lg font-medium"
            loading={loading}
            onClick={onConfirm}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </Modal>
  );
};
