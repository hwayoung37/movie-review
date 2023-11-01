import { useState, useEffect } from 'react'
import CommentList from './CommentList'
import {useParams} from 'react-router-dom'

export default function Comment() {

    const params = useParams();
    const [slicedComments, setSlicedComments] = useState(null);
  const COMMENT_API = `https://moviestates-alternative.codestates-seb.link/reviews/movie/${params.movieId}?orderBy=CREATED_AT`

useEffect(() => {

          fetch(COMMENT_API)
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        setSlicedComments(data)
      })
      .catch(error => console.log(error))

  }, [slicedComments])
  

  const accessToken = localStorage.getItem('accessToken');

  const [comments, setComments] = useState(
    {
  content: "",
  title: "",
  score: 4,
  enjoyPoints: "",
  tensions: ""
}
  )
  
  //코멘트달기
    const handleSubmit = async () => {
    // e.preventDefault();

      const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${accessToken}`, // 토큰을 Authorization 헤더에 포함
};

 try {
      const response = await fetch(`https://moviestates-alternative.codestates-seb.link/reviews/${params.movieId}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(comments),
      });

      const data = await response.json();
      console.log('Server response:', data);
      alert("등록되었습니다");
      console.log("댓글 등록");
      // You can handle the response or perform redirection here.
           // window.location.reload(); // 새로고침 실행
   
    } catch (error) {
      console.error('Error:', error);
      // Handle error here.
    }
  };

  
  //로그인 여부
  // const [login, setLogin] = useState(false)
  //모달창 여닫기
  const [modalOpen, setModalOpen] = useState(false);



  const showModal = () => {
    //로그인 이후는 나중에..해보자..깔깔..ㅎ
         // e.preventDefault()

    setModalOpen(true);

    //현재는 돔 문법 -> react로 ㄱㄱ
    // 모달 열릴 때마다 애니메이션 재생
    const modalElement = document.querySelector('.modal');
    if (modalElement) {
      modalElement.classList.remove('fade-effect'); // 애니메이션 클래스 제거
      // void modalElement.offsetWidth; // 리플로우 강제 실행
      modalElement.classList.add('fade-effect'); // 애니메이션 클래스 추가
    }
                      console.log("쇼모달 확인")
    // 일정 시간 후 모달 닫기
    setTimeout(() => {
      setModalOpen(false);
                  // console.log("2.showModal의 setTimeout 실행되는지 확인")
    }, 2000); // 3초 후에 모달 닫기
  }


   const btnClick = async (e) => {
         e.preventDefault()

     
    if (accessToken) {
      // 토큰이 있을 때의 동작
      await handleSubmit();

    } else {
      // 토큰이 없을 때의 동작
      showModal();
    }
  };

  function ModalBasic() {
    // // 모달 끄기 
    // const closeModal = () => {
    //   setModalOpen(false);
    // };
    return (
      <div className={`modal ${modalOpen ? 'show' : 'hide'}`}>
        <p>로그인 이후 사용 가능합니다.</p>
      </div>
    );
  }
  // <form className="commentForm" action="받는서버주소" name="전송될이름" method="get post 그런거" >
  return (
    <div className="comment">
      <h3>리뷰</h3>
      <div className="comment__content">
              <form className="commentForm" >
        <textarea className="commentForm__input" placeholder="로그인 이후 사용 가능합니다." value={comments.content} onChange={(e) => setComments({ ...comments, content: e.target.value }) } />
        <button className="commentForm__submit" type="submit" value="작성" onClick={(e)=>btnClick(e)}>작성</button>
        {modalOpen && <ModalBasic />}
      </form>
      </div>

      <CommentList slicedComments={slicedComments}/>
    </div>
  )
}
