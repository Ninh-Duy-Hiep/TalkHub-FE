import * as z from 'zod';
import { UserRole } from '../../auth/types';

export const userSchema = z.object({
  fullName: z.string()
    .min(1, 'Họ và tên không được để trống'),
  email: z.string()
    .min(1, 'Email không được để trống')
    .email('Email không đúng định dạng'),
  username: z.string()
    .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
    .optional(),
  password: z.string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa')
    .regex(/[a-z]/, 'Mật khẩu phải chứa ít nhất 1 chữ cái viết thường')
    .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất 1 chữ số')
    .regex(/[^a-zA-Z0-9]/, 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (VD: @, #, $, !...)')
    .optional(),
  phoneNumber: z.string()
    .optional()
    .transform(val => val === '' ? undefined : val)
    .refine(val => !val || /^[0-9]{10,11}$/.test(val), 'Số điện thoại không hợp lệ (10-11 số)'),
  avatarUrl: z.string()
    .url('Đường dẫn ảnh không hợp lệ')
    .optional()
    .or(z.literal('')),
  role: z.nativeEnum(UserRole),
  isActive: z.boolean(),
});

export type UserFormData = z.infer<typeof userSchema>;
