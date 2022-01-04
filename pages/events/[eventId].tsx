import { getEventById } from '../../data/dummy-data';
import {useRouter} from 'next/router'

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

function EventDetailsPage() {
  const router = useRouter();

  const eventId = router?.query.eventId
  const event = getEventById(eventId as string)

  if(!event) {
    return <p> No event found! </p>
  }

  return (
    <div data-testid='event-details'>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>
          {event.description}
        </p>
      </EventContent>
    </div>
  )
}

export default EventDetailsPage
