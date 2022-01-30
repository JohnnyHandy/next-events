import { useEffect, useState, useContext } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'
import NotificationContext from '../../store/notification-context'

function Comments(props: { eventId: string }) {
  const { eventId } = props
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const notificationCtx = useContext(NotificationContext)

  useEffect(() => {
    if (showComments) {
      notificationCtx.showNotification({
        title: 'Loading',
        message: 'Loading event comments.',
        status: 'pending',
      })
      fetch(`/api/comments/${eventId}`)
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          notificationCtx.hideNotification()
          setComments(data.comments)
        })
        .catch(() => {
          notificationCtx.showNotification({
            title: 'Error!',
            message: 'Something went wrong.',
            status: 'error',
          })
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  function addCommentHandler(commentData: {
    name: string
    email: string
    text: string
  }) {
    notificationCtx.showNotification({
      title: 'Sending',
      message: 'Sending your new comment.',
      status: 'pending',
    })

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully sent a comment.',
          status: 'success',
        })
      })
      .catch(() => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: 'Something went wrong.',
          status: 'error',
        })
      })
  }

  return (
    <section data-testid="comments" className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  )
}

export default Comments
