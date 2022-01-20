import { useRouter } from 'next/router'
import Head from 'next/head'

import { Event, getAllEvents } from '../../helpers/api-util'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { GetStaticProps } from 'next'

function AllEventsPage(props: {
  events: Event[]
}) {
  const { events } = props
  const router = useRouter()

  function findEventsHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }
  return (
    <div data-testid="all-events">
      <Head>
          <title> All events </title>
          <meta name='description' content='Find the perfect events for you!' />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents()
  return {
    props: {
      events: events,
    },
    revalidate: 60
  }
}

export default AllEventsPage
