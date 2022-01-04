import { getFeaturedEvents } from '../data/dummy-data'
import EventList from '../components/events/event-list';

function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <h1>Next Events</h1>
      <EventList items={featuredEvents} />
    </div>
  )
}

export default HomePage
