import Link from 'next/link'
import Image from 'next/image'

import classes from './event-item.module.css'

function EventItem(props: {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    image: string;
    isFeatured: boolean;
}) {
    const {
        title, image, date, location, id
    } = props
    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    const formattedAddress = location.replace(', ', '\n')
    const exploreLink = `/events/${id}`
    return(
        <li className={classes.item} data-testid='event-item'>
            <Image
                src={'/' + image}
                alt={title}
                width='100%'
                height={'10rem'}
            />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2> {title} </h2>
                    <div className={classes.date}>
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Link href={exploreLink}> Explore Event </Link>
                </div>
            </div>
        </li>
    )
}

export default EventItem