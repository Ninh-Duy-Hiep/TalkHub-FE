import * as z from "zod";

export const schema = z
  .object({
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa")
      .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất 1 chữ cái viết thường")
      .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 chữ số")
      .regex(/[^a-zA-Z0-9]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (VD: @, #, $, !...)")
      .optional(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });
export type ResetPasswordFormData = z.infer<typeof schema>;
