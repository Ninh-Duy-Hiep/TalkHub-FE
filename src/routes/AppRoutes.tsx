import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/auth/LoginPage';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { UserDashboard } from '../pages/user/UserDashboard';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { UserRole } from '../features/auth/types';
import { AdminLayout } from '../layouts/AdminLayout/AdminLayout';
import { UsersListPage } from '../features/users-management/pages/UsersListPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
      
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRoles={[UserRole.Admin]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UsersListPage />} />
      </Route>
      
      <Route 
        path="/user/*" 
        element={
          <ProtectedRoute allowedRoles={[UserRole.Staff]}>
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route path="/" element={<Navigate to="/user" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
