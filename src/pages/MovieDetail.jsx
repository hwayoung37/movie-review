import MovieInfo from "../component/movieDetail/MovieInfo";
import Comment from "../component/movieDetail/Comment";
import RelatedMovieList from "../component/movieDetail/RelatedMovieList";
import "../style/movieDetail.css";

export default function MovieDetail() {
  return (
    <div className="MovieDetail">
      <MovieInfo />
      <Comment />
      <RelatedMovieList />
    </div>
  );
}
