import EventItem from './event-item'
import { Event } from '../../helpers/api-util'

import classes from './event-list.module.css'

function EventList(props: { items: Event[] }) {
  const { items } = props
  return (
    <ul className={classes.list} data-testid="event-list">
      {items.map((event) => {
        return <EventItem key={event.title} {...event} />
      })}
    </ul>
  )
}

export default EventList
