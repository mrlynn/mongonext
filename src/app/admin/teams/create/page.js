// src/app/admin/teams/create/page.js
import AddIcon from '@mui/icons-material/Add';
import PlaceholderPage from '../../../../components/ui/PlaceholderPage';

export const metadata = {
  title: "Create Team | MongoNext Admin",
};

export default function CreateTeamPage() {
  return (
    <PlaceholderPage 
      title="Create Team" 
      description="Create a new team for an upcoming hackathon event."
      icon={<AddIcon />}
    />
  );
}