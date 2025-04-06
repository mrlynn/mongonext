// src/app/admin/events/create/page.js
import AddIcon from '@mui/icons-material/Add';
import PlaceholderPage from '@/components/ui/PlaceholderPage';

export const metadata = {
  title: "Create Event | MongoNext Admin",
};

export default function CreateEventPage() {
  return (
    <PlaceholderPage 
      title="Create Event" 
      description="Create a new hackathon event for participants to join."
      icon={<AddIcon />}
    />
  );
}