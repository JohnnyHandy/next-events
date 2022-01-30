import { useRef, useContext } from 'react'
import classes from './newsletter-registration.module.css'
import NotificationContext from '../../store/notification-context'

function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>(null)
  const notificationCtx = useContext(NotificationContext)

  function registrationHandler(event: React.FormEvent<HTMLFormElement>) {
    notificationCtx.showNotification({
      title: 'Signing Up',
      message: 'Registering for newsletter.',
      status: 'pending',
    })
    event.preventDefault()
    const enteredEmail = emailInputRef?.current?.value

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
    })
      .then(() => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter.',
          status: 'success',
        })
      })
      .catch(() => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: 'Something went wrong!',
          status: 'error',
        })
      })
  }

  return (
    <section
      data-testid="newsletter-registration"
      className={classes.newsletter}
    >
      <h2>Sign up to stay updated!</h2>
      <form data-testid="registration-form" onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            data-testid="input-email"
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button data-testid="submit-button">Register</button>
        </div>
      </form>
    </section>
  )
}

export default NewsletterRegistration
