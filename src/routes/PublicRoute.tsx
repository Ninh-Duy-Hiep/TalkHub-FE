import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { UserRole } from '../features/auth/types';

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    if (user.role === UserRole.Admin) {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/user" replace />;
  }

  return <>{children}</>;
}
