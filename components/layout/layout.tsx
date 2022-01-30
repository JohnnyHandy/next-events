import { Fragment, useContext } from 'react'
import MainHeader from './main-header'
import Notification from '../ui/notification'
import NotificationContext from '../../store/notification-context'

function Layout(props: { children: React.ReactNode }) {
  const { children } = props
  const notificationCtx = useContext(NotificationContext)

  const activeNotification = notificationCtx.notification
  return (
    <Fragment>
      <MainHeader data-testid="layout-header" />
      <main data-testid="layout">{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  )
}

export default Layout
