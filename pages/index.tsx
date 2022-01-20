import Head from 'next/head'

import { getFeaturedEvents, Event } from '../helpers/api-util'
import EventList from '../components/events/event-list'

function HomePage(props: {
  events: Event[]
}) {
  const { events } = props

  return (
    <div data-testid="home">
      <Head>
        <title> NextJS Events </title>
        <meta name='description' content='Find the perfect events for you!' />
      </Head>
      <EventList items={events} />
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      events: featuredEvents
    }
  }
}

export default HomePage
