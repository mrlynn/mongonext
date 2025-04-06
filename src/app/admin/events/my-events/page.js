// src/app/admin/events/my-events/page.js
import PersonIcon from '@mui/icons-material/Person';
import PlaceholderPage from '../../../../components/ui/PlaceholderPage';

export const metadata = {
  title: "My Events | MongoNext Admin",
};

export default function MyEventsPage() {
  return (
    <PlaceholderPage 
      title="My Events" 
      description="View and manage events that you have created or are administering."
      icon={<PersonIcon />}
    />
  );
}