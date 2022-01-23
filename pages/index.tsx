import Head from 'next/head'

import { getFeaturedEvents, Event } from '../helpers/api-util'
import EventList from '../components/events/event-list'
import NewsletterRegistration from '../components/input/newsletter-registration'

function HomePage(props: { events: Event[] }) {
  const { events } = props

  return (
    <div data-testid="home">
      <Head>
        <title> NextJS Events </title>
        <meta name="description" content="Find the perfect events for you!" />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      events: featuredEvents,
    },
  }
}

export default HomePage
