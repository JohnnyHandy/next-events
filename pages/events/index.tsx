﻿import { useRouter } from 'next/router'

import { getAllEvents } from '../../data/dummy-data'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'

function AllEventsPage() {
  const events = getAllEvents()
  const router = useRouter()

  function findEventsHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }
  return (
    <div data-testid="all-events">
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  )
}

export default AllEventsPage
