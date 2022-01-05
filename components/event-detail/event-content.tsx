import classes from './event-content.module.css'

function EventContent(props: { children: React.ReactNode }) {
  return (
    <section data-testid="event-content" className={classes.content}>
      {props.children}
    </section>
  )
}

export default EventContent
