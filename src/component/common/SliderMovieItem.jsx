import { Link } from "react-router-dom";
import "../../style/slidermovieitem.css";

export default function SliderMovieItem({ movie }) {
  const avg = movie.averageScore || 0;

  function limitTextLength(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }
  const plot = limitTextLength(movie.plot, 70);

  const releasedAt = movie.releasedAt;

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="slider__movie__item">
        {/* 영화 포스터 */}
        <img src={movie.postImage} className="slider__movie__item__image" />
        {/* 영화 제목 */}
        <div className="slider__movie__item__info">
          <h3 className="slider__movie__item__title"> {movie.title}</h3>
          {/* 영화 평점 */}
          <div className="slider__movie__item__avg">
            평점: ⭐️ {avg.toFixed(1)}
          </div>
          {/* 영화 개봉일 */}
          <div className="slider__movie__item__rat">
            개봉일: {releasedAt.slice(0, 4)}-{releasedAt.slice(4, 6)}-
            {releasedAt.slice(6, 8)}
          </div>
          {/* 영화 장르 */}
          <div className="slider__movie__item__genre">
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          {/* 영화 줄거리 */}
          <div className="slider__movie__item__plot">{plot}</div>
        </div>
      </div>
    </Link>
  );
}
