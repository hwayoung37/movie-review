import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import "../../style/comment.css";

export default function Comment() {
  const params = useParams();
  const [slicedComments, setSlicedComments] = useState(null);

  //새로운 코멘트를 받는 상태
  const [comments, setComments] = useState({
    content: "",
    title: "",
    score: 5,
    enjoyPoints: "",
    tensions: "",
  });

  //모달창 열림 닫힘 상태
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    //✅api 연결 : 코멘트 불러오기
    fetch(
      `https://moviestates-alternative.codestates-seb.link/reviews/movie/${params.movieId}?orderBy=CREATED_AT`
    )
      .then((res) => res.json())
      .then((data) => {
        setSlicedComments(data);
      })
      .catch((error) => console.log(error));
  }, [params.movieId]); //영화가 바뀔때 마다 해당 영화의 코멘트 불러오기

  //1. 코멘트 생성 api연결 시   2. 로그인 여부 확인
  const accessToken = localStorage.getItem("accessToken");

  //✅api 연결 : 로그인 시 작성 버튼 클릭 시 코멘트 생성
  const handleSubmit = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // 토큰을 Authorization 헤더에 포함
    };

    try {
      const response = await fetch(
        `https://moviestates-alternative.codestates-seb.link/reviews/${params.movieId}`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(comments),
        }
      );

      const data = await response.json();
      console.log("Server response:", data);
      alert("등록되었습니다");

      await fetch(
        `https://moviestates-alternative.codestates-seb.link/reviews/movie/${params.movieId}?orderBy=CREATED_AT`
      )
        .then((res) => res.json())
        .then((data) => {
          setSlicedComments(data);
        })
        .catch((error) => console.log(error));

      // 코멘트를 등록한 후 comments 상태 초기화
      setComments({
        content: "",
        title: "",
        score: 5,
        enjoyPoints: "",
        tensions: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //비로그인 시 작성 버튼 눌렀을 때 모달 상태가 true로 변경되어 보여짐
  const showModal = () => {
    setModalOpen(true);

    // 2초뒤 모달 닫기
    setTimeout(() => {
      setModalOpen(false);
    }, 2000);
  };

  //작성 버튼 클릭 시
  const btnClick = async (e) => {
    e.preventDefault();

    if (accessToken) {
      await handleSubmit();
    } else {
      showModal();
    }
  };

  //💡모달 컴포넌트
  function ModalBasic() {
    return (
      <div className={`modal ${modalOpen ? "show" : "hide"}`}>
        <p>로그인 이후 사용 가능합니다.</p>
      </div>
    );
  }

  return (
    <div className="comment">
      <h3>리뷰</h3>
      <div className="comment__content">
        <form className="commentForm">
          <textarea
            className="commentForm__input"
            placeholder="로그인 이후 사용 가능합니다."
            value={comments.content}
            onChange={(e) =>
              setComments({ ...comments, content: e.target.value })
            }
          />
          <select
            value={comments.score}
            onChange={(e) =>
              setComments({ ...comments, score: e.target.value })
            }
          >
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>
          <button
            className="commentForm__submit"
            type="submit"
            value="작성"
            onClick={(e) => btnClick(e)}
          >
            작성
          </button>
          {modalOpen && <ModalBasic />}
        </form>
      </div>

      <CommentList slicedComments={slicedComments} />
    </div>
  );
}
