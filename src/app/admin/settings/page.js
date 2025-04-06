// src/app/admin/settings/page.js
import SettingsIcon from '@mui/icons-material/Settings';
import PlaceholderPage from '../../../components/ui/PlaceholderPage';

export const metadata = {
  title: "Settings | MongoNext Admin",
};

export default function SettingsPage() {
  return (
    <PlaceholderPage 
      title="Settings" 
      description="Configure your account and platform settings."
      icon={<SettingsIcon />}
    />
  );
}