import classes from './error-alert.module.css'

function ErrorAlert(props: { children: React.ReactNode }) {
  return (
    <div data-testid="error-alert" className={classes.alert}>
      {props.children}
    </div>
  )
}

export default ErrorAlert
