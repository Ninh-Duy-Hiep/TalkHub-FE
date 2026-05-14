import { useEffect } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { authApi } from '../api/auth.api';

export function useAuthInit() {
  const { setAuth, clearAuth, setLoading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authApi.getMe();
        if (res.success && res.data) {
          setAuth(res.data);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const handleUnauthorized = () => {
      clearAuth();
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [setAuth, clearAuth, setLoading]);
}
