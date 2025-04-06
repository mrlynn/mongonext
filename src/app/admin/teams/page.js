// src/app/admin/teams/page.js
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import PlaceholderPage from '../../../components/ui/PlaceholderPage';

export const metadata = {
  title: "Teams | MongoNext Admin",
};

export default function TeamsPage() {
  return (
    <PlaceholderPage 
      title="Teams" 
      description="View and manage all teams participating in your events."
      icon={<GroupWorkIcon />}
    />
  );
}