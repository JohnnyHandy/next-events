import { createContext, useState, useEffect, useContext } from 'react'

export type NotificationData = {
  title: string
  message: string
  status: string
}

const NotificationContext = createContext<{
  notification: NotificationData | null
  showNotification: (notificationData: NotificationData) => void
  hideNotification: () => void
}>({
  notification: null,
  showNotification: function () {
    return undefined
  },
  hideNotification: function () {
    return undefined
  },
})

export function NotificationContextProvider(props: {
  children: React.ReactNode
}) {
  const [activeNotification, setActiveNotification] =
    useState<NotificationData | null>(null)

  useEffect(() => {
    if (
      (activeNotification && activeNotification.status === 'success') ||
      activeNotification?.status === 'error'
    ) {
      const timer = setTimeout(() => {
        hideNotificationHandler()
      }, 3000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [activeNotification])

  function showNotificationHandler(notificationData: NotificationData) {
    setActiveNotification(notificationData)
  }

  function hideNotificationHandler() {
    setActiveNotification(null)
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  }

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = () => useContext(NotificationContext)

export default NotificationContext
