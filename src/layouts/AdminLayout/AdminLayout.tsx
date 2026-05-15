import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import { RxDashboard } from "react-icons/rx";
import { LuUsers, LuUser, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { LiaUserSolid } from "react-icons/lia";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { authApi } from '../../features/auth/api/auth.api';

const { Sider, Content } = Layout;

export const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } finally {
      clearAuth();
      navigate('/login');
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <LiaUserSolid className='w-4 h-4'/>,
      label: 'Thông tin cá nhân',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <IoMdLogOut className='w-4 h-4'/>,
      label: 'Đăng xuất',
      onClick: handleLogout,
      danger: true,
    },
  ];

  const menuItems = [
    {
      key: '/admin',
      icon: <RxDashboard className='w-5 h-5'/>,
      label: 'Tổng quan',
      onClick: () => navigate('/admin'),
    },
    {
      key: '/admin/users',
      icon: <LuUsers className='w-5 h-5'/>,
      label: 'Quản lý người dùng',
      onClick: () => navigate('/admin/users'),
    },
  ];

  return (
    <Layout className="h-screen overflow-hidden bg-white">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="light"
        className="border-r border-gray-100 bg-white relative h-full"
        width={260}
      >
        <div className="flex flex-col h-full bg-white">
          <div className="flex items-center gap-3 p-6 mb-2 shrink-0">
            <div className="bg-blue-600 p-1.5 rounded-lg shrink-0 shadow-lg shadow-blue-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5C21 16.75 16.5 21 12 21C11.26 21 10.55 20.9 9.87 20.72L4 22L5.28 16.13C3.86 14.86 3 13.27 3 11.5C3 6.25 7.5 2 12 2C16.5 2 21 6.25 21 11.5Z" fill="white"/>
              </svg>
            </div>
            {!collapsed && (
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                TalkHub
              </span>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              items={menuItems}
              className="border-none"
            />
          </div>

          <div className="p-4 border-t border-gray-100 shrink-0 mt-auto bg-white">
            <div className={`flex items-center ${collapsed ? 'flex-col gap-2' : 'justify-between gap-3'}`}>
              <Dropdown menu={{ items: userMenuItems }} placement="topRight" arrow>
                <div className={`flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-all ${collapsed ? 'w-10 h-10 justify-center' : 'flex-1 min-w-0'}`}>
                  <Avatar
                    src={user?.avatarUrl || undefined} 
                    icon={<LuUser />}
                    className="bg-blue-100 text-blue-600 shrink-0 shadow-sm"
                    size={collapsed ? 32 : 40}
                  />
                  {!collapsed && (
                    <div className="flex flex-col min-w-0 overflow-hidden">
                      <span className="text-sm font-bold text-gray-900 truncate leading-tight">
                        {user?.fullName}
                      </span>
                      <span className="text-xs text-gray-500 truncate">
                        {user?.role === 1 ? 'Quản trị viên' : 'Nhân viên'}
                      </span>
                    </div>
                  )}
                </div>
              </Dropdown>

              <Button
                type="text"
                icon={collapsed ? <LuChevronRight className="w-4 h-4" /> : <LuChevronLeft className="w-4 h-4" />}
                onClick={() => setCollapsed(!collapsed)}
                className={`flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors ${collapsed ? 'w-8 h-8' : 'w-8 h-8 shrink-0'}`}
              />
            </div>
          </div>
        </div>
      </Sider>

      <Layout className="flex flex-col h-full overflow-hidden bg-white">
        <Content className="overflow-auto flex-1 bg-white p-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
