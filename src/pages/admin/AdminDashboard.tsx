import { Typography } from 'antd';

const { Title } = Typography;

export function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <Title level={2}>Tổng quan hệ thống</Title>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <p className="text-blue-600 text-sm font-medium">Người dùng</p>
          <p className="text-3xl font-bold text-blue-900">--</p>
        </div>
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <p className="text-emerald-600 text-sm font-medium">Hội thoại</p>
          <p className="text-3xl font-bold text-emerald-900">--</p>
        </div>
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
          <p className="text-amber-600 text-sm font-medium">Tin nhắn</p>
          <p className="text-3xl font-bold text-amber-900">--</p>
        </div>
      </div>
    </div>
  );
}
