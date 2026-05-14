import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(1, 'Vui lòng nhập email hoặc số điện thoại'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading: boolean;
  errorMsg: string | null;
}

export function LoginForm({ onSubmit, isLoading, errorMsg }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Chào mừng trở lại!</h2>
        <p className="text-gray-500">Đăng nhập để tiếp tục sử dụng TalkHub</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {errorMsg ? (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium" aria-live="polite">
              {errorMsg}
            </div>
          ) : null}

        {/* Username */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 block" htmlFor="username">
            Email hoặc số điện thoại
          </label>
          <div className="relative">
            <input
              id="username"
              type="text"
              placeholder="Nhập email hoặc số điện thoại"
              autoComplete="username"
              className={`w-full px-4 py-3 border rounded-xl outline-none transition-colors ${
                errors.username ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500' : 'border-gray-200 focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500'
              }`}
              {...register('username')}
            />
          </div>
          {errors.username ? (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          ) : null}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 block" htmlFor="password">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu"
              autoComplete="current-password"
              className={`w-full pl-4 pr-12 py-3 border rounded-xl outline-none transition-colors ${
                errors.password ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500' : 'border-gray-200 focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500'
              }`}
              {...register('password')}
            />
            <button
              type="button"
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
            </button>
          </div>
          {errors.password ? (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          ) : null}
        </div>

        {/* Forgot password */}
        <div className="flex justify-end">
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
            Quên mật khẩu?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          {isLoading ? 'Đang đăng nhập…' : 'Đăng nhập'}
        </button>

        {/* Divider */}
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">hoặc</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Facebook Login */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-blue-600 font-medium py-3 rounded-xl transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          {/* Simple FB icon using svg */}
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
          Đăng nhập với Facebook
        </button>
      </form>

      {/* Register */}
      <div className="mt-8 text-center text-sm text-gray-600">
        Chưa có tài khoản?{' '}
        <a href="#" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
          Đăng ký ngay
        </a>
      </div>
    </div>
  );
}
