import classes from './logistics-item.module.css'

function LogisticsItem(props: {
  icon: () => JSX.Element
  children: React.ReactNode
}) {
  const { icon: Icon } = props

  return (
    <li data-testid="logistics-item" className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  )
}

export default LogisticsItem
