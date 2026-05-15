import { message } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import { mediaApi } from '../api/media.api';

export const validateImageBeforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
  if (!isJpgOrPng) {
    message.error('Bạn chỉ có thể tải lên file JPG/JPEG/PNG/WEBP!');
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('Ảnh phải nhỏ hơn 10MB!');
  }
  return isJpgOrPng && isLt10M;
};

export const handleImageUpload = async (file: File): Promise<string | null> => {
  try {
    const res = await mediaApi.uploadAvatar(file);
    if (res.success && res.data) {
      message.success('Tải ảnh lên thành công');
      return res.data;
    } else {
      message.error(res.message || 'Tải ảnh lên thất bại');
      return null;
    }
  } catch (error) {
    console.error('Upload Error:', error);
    message.error('Có lỗi xảy ra khi tải ảnh lên');
    return null;
  }
};

export const getFullImageUrl = (path?: string | null) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  const apiUrl = import.meta.env.VITE_API_URL;
  return `${apiUrl}${path}`;
};
