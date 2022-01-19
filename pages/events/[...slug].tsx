﻿import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
import { Event } from '../../helpers/api-util'

function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState<Event[]>([])
  const router = useRouter()
  const filterData = router?.query?.slug as string[]
  const { data } = useSWR('https://nodejs-course-cd6d2-default-rtdb.firebaseio.com/events.json', (url) => fetch(url).then(res => {
    return res.json()
  }))

  useEffect(() => {
    const events = []
    for(const key in data) {
      events.push({
          id: key,
          ...data[key]
      })
    }
    setLoadedEvents(events as Event[])
  }, [data])



  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]
  const numYear = +filteredYear
  const numMonth = +filteredMonth


  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p data-testid="invalid-filter-params">
            Invalid filter. Please adjust the values.
          </p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events"> Show All Events </Button>
        </div>
      </>
    )
  }

  

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth as number - 1
    )
  })

  if (!filteredEvents || filteredEvents.length === 0 && data !== undefined) {
    return (
      <>
        <ErrorAlert>
          <p data-testid="no-events-found">No events found.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events"> Show All Events </Button>
        </div>
      </>
    )
  }

  if (data == undefined) {
    return (
      <p data-testid="loading-filtered-events" className="center">
        Loading...
      </p>
    )
  }

  const date = new Date(numYear as number, numMonth as number - 1)
  return (
    <div data-testid="filtered-events">
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  )
  
}


export default FilteredEventsPage