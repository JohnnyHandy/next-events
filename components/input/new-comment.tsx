import { useRef, useState } from 'react'
import classes from './new-comment.module.css'

function NewComment(props: {
  onAddComment: ({
    email,
    name,
    text,
  }: {
    email: string
    name: string
    text: string
  }) => void
}) {
  const [isInvalid, setIsInvalid] = useState(false)

  const emailInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const commentInputRef = useRef<HTMLTextAreaElement>(null)

  function sendCommentHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const enteredEmail = emailInputRef?.current?.value
    const enteredName = nameInputRef?.current?.value
    const enteredComment = commentInputRef?.current?.value
    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@') ||
      !enteredName ||
      enteredName.trim() === '' ||
      !enteredComment ||
      enteredComment.trim() === ''
    ) {
      setIsInvalid(true)
      return
    }

    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    })
  }

  return (
    <form
      data-testid="comment-form"
      onSubmit={sendCommentHandler}
      className={classes.form}
    >
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input
            data-testid="email-input"
            type="email"
            id="email"
            ref={emailInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input
            data-testid="name-input"
            type="text"
            id="name"
            ref={nameInputRef}
          />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea
          data-testid="comment-input"
          id="comment"
          rows={5}
          ref={commentInputRef}
        ></textarea>
      </div>
      {isInvalid && (
        <p data-testid="invalid-input">
          Please enter a valid email address and comment!
        </p>
      )}
      <button data-testid="send-comment">Submit</button>
    </form>
  )
}

export default NewComment
