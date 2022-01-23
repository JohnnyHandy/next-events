import classes from './comment-list.module.css'

function CommentList(props: {
  comments: {
    id: string
    text: string
    name: string
  }[]
}) {
  const { comments } = props
  return (
    <ul data-testid="comment-list" className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {comments.map((comment) => {
        return (
          <li key={comment.id}>
            <p>{comment.text}</p>
            <div>By {comment.name}</div>
          </li>
        )
      })}
    </ul>
  )
}

export default CommentList
