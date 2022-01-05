import Link from 'next/link'

import classes from './button.module.css'

function Button(props: {
  children: React.ReactNode
  link?: string
  onClick?: () => void
}) {
  if (props.link) {
    return (
      <Link href={props.link}>
        <a data-testid="button-link" className={classes.btn}>
          {props.children}
        </a>
      </Link>
    )
  }
  return (
    <button
      data-testid="default"
      className={classes.btn}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
