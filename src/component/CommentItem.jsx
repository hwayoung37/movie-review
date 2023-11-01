

export default function CommentItem ({comment}) {
//닉네임(user.nickname), 프로필이미지(user.profileImage), 평점(score), 댓글내용(content), 작성일자(createdAt)

  const date = comment.createdAt.slice(0,10)
  
  return (
    <div className ="commentItem">
      <div className="commentItem__nick_score">
        <div className="nickname">
          {comment.user.nickname}
        </div>
        <div className="score">
          평점 ⭐️ {comment.score}
        </div>
      </div>
      <hr />
      <div className="commentItem__content">
        {comment.content}
      </div>
      <hr />
      <div className="commentItem__date">
        {date}
      </div>
    </div>
  )
}