import React, { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { axiosService } from '../../services/AxiosService'
import NotificationService from '../../services/NotificationService'
import { User } from 'firebase/auth'
import NotificationModel from '../../models/NotificationModel'

interface UserNotificationsComponentProps {
  user: User | null
}

export default function UserNotificationsComponent (props: UserNotificationsComponentProps): JSX.Element {
  const [notifications, setNotifications] = React.useState<NotificationModel[]>([])
  const [isSateLoaded, setIsStateLoaded] = React.useState<boolean>(false)
  const notificationService = new NotificationService(axiosService)
  const maxNotificationsCount = 6

  async function getUsersNotifications (): Promise<void> {
    if (props.user !== null) {
      const notifications = await notificationService.getUserNotifications(props.user.uid)
      setNotifications(notifications)
      setIsStateLoaded(true)
    }
  }

  function loadNotificationSkeletons (): JSX.Element[] {
    const skeletons = []

    for (let i = 0; i < maxNotificationsCount; i++) {
      skeletons.push(
                <div key={i} className="col-span-1 rounded-md hover:translate-y-1 mt-2">
                  <h6 className="p-2 text-sm text-white truncate"><Skeleton baseColor="black"/></h6>
                </div>)
    }

    return skeletons
  }

  useEffect(() => {
    void getUsersNotifications()
  })

  return (
        <>
            {isSateLoaded && notifications.map((notification, index) => index < maxNotificationsCount
              ? (
                <div key={index} className="col-span-1 rounded-md hover:translate-x-1 bg-zinc-900 hover:border-l-4 mt-2 hover:border-zinc-400">
                    <h6 className="p-2 text-sm text-white truncate">{notification.content}</h6>
                </div>
                )
              : null)}
            {isSateLoaded && notifications.length === 0 &&
                <div className="col-span-1 rounded-md hover:translate-x-1 hover:border-l-4 mt-2 hover:border-blue-400">
                    <h6 className="p-2 text-sm text-white truncate">No notifications found.</h6>
                </div>
            }
            {!isSateLoaded && loadNotificationSkeletons()}
        </>
  )
}
