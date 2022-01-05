import EventItem from './event-item'

import classes from './event-list.module.css'

function EventList(props: {
  items: {
    id: string
    title: string
    description: string
    location: string
    date: string
    image: string
    isFeatured: boolean
  }[]
}) {
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
