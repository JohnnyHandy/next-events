import { getEventById, Event, getFeaturedEvents } from '../../helpers/api-util'
import { GetStaticProps } from 'next'
import Head from 'next/head'

import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from '../../components/ui/error-alert'

function EventDetailsPage(props: { selectedEvent: Event | undefined }) {
  const { selectedEvent: event } = props

  if (!event) {
    return (
      <ErrorAlert>
        <p> No event found! </p>
      </ErrorAlert>
    )
  }

  return (
    <div data-testid="event-details">
      <Head>
        <title> {event.title} </title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const eventId = context?.params?.eventId
  const event = await getEventById(eventId as string)
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents()
  const paths = events.map((event) => ({ params: { eventId: event.id } }))
  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export default EventDetailsPage
