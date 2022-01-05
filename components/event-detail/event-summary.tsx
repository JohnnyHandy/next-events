import classes from './event-summary.module.css'

function EventSummary(props: { title: string }) {
  const { title } = props

  return (
    <section data-testid="event-summary" className={classes.summary}>
      <h1>{title}</h1>
    </section>
  )
}

export default EventSummary
