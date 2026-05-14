import { authApi } from '../../features/auth/api/auth.api';
import { useAuthStore } from '../../store/useAuthStore';

export function AdminDashboard() {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } finally {
      clearAuth();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-red-600">Admin Dashboard</h1>
      <button 
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
