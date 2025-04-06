// src/app/admin/Dashboard.stories.js
import AdminDashboard from './page';

export default {
  title: 'Pages/Admin/Dashboard',
  component: AdminDashboard,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = () => <AdminDashboard />;