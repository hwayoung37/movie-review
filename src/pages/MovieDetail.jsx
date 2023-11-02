import MovieInfo from "../component/movieDetail/MovieInfo";
import Comment from "../component/movieDetail/Comment";
import RelatedMovieList from "../component/movieDetail/RelatedMovieList";
import "../style/movieDetail.css";

export default function MovieDetail() {
  {
    /* // 영화제목, 현재url 복사 버튼, 러닝타임, 장르, 개봉일
    // -----------------------------------------------
    // 포스터, 좋아요, 북마크, 코멘트
    // 평점, 스태프, 줄거리
    // -----------------------------------------------
    // 코멘트 작성 화면
    // 코멘트 작성자 아이디, 작성자가 준 평점
    // 텍스트 에어리어, 신고 버튼
    // 종아요, 댓글, 코멘트 날짜
    // 모든 코멘트 볼 수 있는 더보기 버튼(다른 화면으로 넘어감)
    // -----------------------------------------------
    // 연관된 영화 */
  }
  return (
    <div className="MovieDetail">
      <MovieInfo />
      <Comment />
      <RelatedMovieList />
    </div>
  );
}
