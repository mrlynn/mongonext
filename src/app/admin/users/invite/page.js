// src/app/admin/users/invite/page.js
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PlaceholderPage from '../../../../components/ui/PlaceholderPage';

export const metadata = {
  title: "Invite User | MongoNext Admin",
};

export default function InviteUserPage() {
  return (
    <PlaceholderPage 
      title="Invite User" 
      description="Send invitations to new users to join your organization."
      icon={<PersonAddIcon />}
    />
  );
}