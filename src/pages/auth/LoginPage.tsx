import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { LoginForm } from '../../features/auth/components/LoginForm';
import { authApi } from '../../features/auth/api/auth.api';
import { useAuthStore } from '../../store/useAuthStore';
import { UserRole } from '../../features/auth/types';
import type { ApiResponse } from '../../types/api';

export function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getMeMutation = useMutation({
    mutationFn: authApi.getMe,
    onSuccess: (response) => {
      if (response.success && response.data) {
        setAuth(response.data);
        
        if (response.data.role === UserRole.Admin) {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      } else {
        setErrorMsg('Không thể lấy thông tin người dùng.');
      }
    },
    onError: () => {
      setErrorMsg('Đăng nhập thành công nhưng không thể lấy dữ liệu phiên đăng nhập.');
    }
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      if (response.success) {
        getMeMutation.mutate();
      } else {
        setErrorMsg(response.message || 'Đăng nhập thất bại.');
      }
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      const msg = error.response?.data?.message || 'Đã có lỗi xảy ra khi đăng nhập.';
      setErrorMsg(msg);
    }
  });

  const handleLogin = (data: { username: string; password: string }) => {
    setErrorMsg(null);
    loginMutation.mutate(data);
  };

  const isLoading = loginMutation.isPending || getMeMutation.isPending;

  return (
    <div className="min-h-screen bg-blue-50/50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        
        <div className="hidden lg:flex flex-1 flex-col justify-center max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-600 p-2 rounded-xl">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M21 11.5C21 16.75 16.5 21 12 21C11.26 21 10.55 20.9 9.87 20.72L4 22L5.28 16.13C3.86 14.86 3 13.27 3 11.5C3 6.25 7.5 2 12 2C16.5 2 21 6.25 21 11.5Z" fill="white"/>
                <circle cx="8" cy="11.5" r="1.5" fill="#1d4ed8"/>
                <circle cx="12" cy="11.5" r="1.5" fill="#1d4ed8"/>
                <circle cx="16" cy="11.5" r="1.5" fill="#1d4ed8"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">TalkHub</h1>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Quản lý nhiều page,<br />
            <span className="text-blue-600">Hội thoại tập trung.</span>
          </h2>
          
          <p className="text-gray-600 text-lg mb-12">
            TalkHub giúp bạn quản lý nhiều Fanpage bằng một tài khoản duy nhất và tập hợp tất cả đoạn chat về một nơi để dễ dàng theo dõi và chăm sóc khách hàng.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Quản lý nhiều page</h3>
                <p className="text-gray-500">Thêm và quản lý nhiều Fanpage trên cùng một tài khoản TalkHub.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Tập trung hội thoại</h3>
                <p className="text-gray-500">Tất cả tin nhắn từ các page khác nhau được tập hợp về một nơi.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Tiết kiệm thời gian</h3>
                <p className="text-gray-500">Không cần đăng nhập qua lại giữa nhiều tài khoản Facebook.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <LoginForm 
            onSubmit={handleLogin} 
            isLoading={isLoading} 
            errorMsg={errorMsg} 
          />
        </div>

      </div>
    </div>
  );
}
