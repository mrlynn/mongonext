// src/app/admin/users/page.js
import PeopleIcon from '@mui/icons-material/People';
import PlaceholderPage from '../../../components/ui/PlaceholderPage';

export const metadata = {
  title: "Users | MongoNext Admin",
};

export default function UsersPage() {
  return (
    <PlaceholderPage 
      title="Users" 
      description="View and manage all users registered on the platform."
      icon={<PeopleIcon />}
    />
  );
}