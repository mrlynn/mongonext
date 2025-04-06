// src/app/admin/events/page.js
import EventIcon from '@mui/icons-material/Event';
import PlaceholderPage from '../../../components/ui/PlaceholderPage';

export const metadata = {
  title: "Events | MongoNext Admin",
};

export default function EventsPage() {
  return (
    <PlaceholderPage 
      title="Events" 
      description="View and manage all hackathon events in your organization."
      icon={<EventIcon />}
    />
  );
}