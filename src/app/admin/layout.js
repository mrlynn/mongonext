// src/app/admin/layout.js
import MainLayout from '@/components/layout/MainLayout';

export const metadata = {
  title: "Admin Dashboard | MongoNext",
  description: "Admin dashboard for MongoNext",
};

export default function AdminLayout({ children }) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}