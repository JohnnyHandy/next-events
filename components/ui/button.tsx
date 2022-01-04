import Link from "next/link";

import classes from './button.module.css'

function Button(props: {
    children: React.ReactNode,
    link: string
}) {
    return (
        <Link href={props.link}>
            <a data-testid='button-link' className={classes.btn}>
                {props.children}
            </a>
        </Link>
    )
}

export default Button