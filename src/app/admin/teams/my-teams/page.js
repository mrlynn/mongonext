// src/app/admin/teams/my-teams/page.js
import PersonIcon from '@mui/icons-material/Person';
import PlaceholderPage from '../../../../../components/ui/PlaceholderPage';

export const metadata = {
  title: "My Teams | MongoNext Admin",
};

export default function MyTeamsPage() {
  return (
    <PlaceholderPage 
      title="My Teams" 
      description="View and manage teams that you have created or are a member of."
      icon={<PersonIcon />}
    />
  );
}