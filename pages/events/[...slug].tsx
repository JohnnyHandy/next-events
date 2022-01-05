﻿import { getFilteredEvents } from '../../data/dummy-data'
import { useRouter } from 'next/router'

import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'

function FilteredEventsPage() {
  const router = useRouter()
  const filterData = router?.query.slug

  if (!filterData) {
    return (
      <p data-testid="loading-filtered-events" className="center">
        Loading...
      </p>
    )
  }
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

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth })
  if (!filteredEvents || filteredEvents.length === 0) {
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

  const date = new Date(numYear, numMonth - 1)
  return (
    <div data-testid="filtered-events">
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  )
}

export default FilteredEventsPage
