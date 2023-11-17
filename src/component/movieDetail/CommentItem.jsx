import { useParams } from "react-router-dom";

export default function CommentItem({ comment, setSlicedComments, userInfo }) {
  //닉네임(user.nickname), 프로필이미지(user.profileImage), 평점(score), 댓글내용(content), 작성일자(createdAt)
  const params = useParams();
  const date = comment.createdAt.slice(0, 10);

  const accessToken = localStorage.getItem("accessToken");

  const removeBtnHandler = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // 토큰을 Authorization 헤더에 포함
    };

    alert("삭제하시겠습니까?");
    await fetch(
      `https://moviestates-alternative.codestates-seb.link/reviews/${comment.id}`,
      {
        method: "DELETE",
        headers: headers,
      }
    ).then((res) => {
      console.log("삭제 데이터 : ", res);
    });

    await fetch(
      `https://moviestates-alternative.codestates-seb.link/reviews/movie/${params.movieId}?orderBy=CREATED_AT`
    )
      .then((res) => res.json())
      .then((data) => {
        setSlicedComments(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="commentItem">
      <div className="commentItem__nick_score">
        <div className="nickname">{comment.user.nickname}</div>
        <div className="score">평점 ⭐️ {comment.score}</div>
      </div>
      <hr />
      <div className="commentItem__content">{comment.content}</div>
      <div className="commentItem__date">{date}</div>
      <hr />
      <div className="commentItem_bottom">
        {userInfo === comment.user.email ? (
          <button className="commentItem_btn">수정</button>
        ) : null}
        {userInfo === comment.user.email ? (
          <button
            className="commentItem_btn"
            onClick={() => removeBtnHandler()}
          >
            삭제
          </button>
        ) : null}
      </div>
    </div>
  );
}
