// import dummyData from '../static/dummyData.json'
import { Link } from "react-router-dom";

export default function MovieItem({ movie }) {
  // const movie = dummyData.data[0]

  // const avg = Math.round(movie.averageScore*10)/10
  const avg = movie.averageScore || 0;

  function limitTextLength(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }
  const plot = limitTextLength(movie.plot, 70);

  const releasedAt = movie.releasedAt;

  // console.log(plot);
  // console.log(movie)
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="movie__item">
        {/* 영화 포스터 */}
        <img src={movie.postImage} className="movie__item__image" />
        {/* 영화 제목 */}
        <div className="movie__item__info">
          <h3 className="movie__item__title"> {movie.title}</h3>
          {/* 영화 평점 */}
          <div className="movie__item__avg">평점: ⭐️ {avg.toFixed(1)}</div>
          {/* 영화 개봉일 */}
          <div className="movie__item__rat">
            개봉일: {releasedAt.slice(0, 4)}-{releasedAt.slice(4, 6)}-
            {releasedAt.slice(6, 8)}
          </div>
          {/* 영화 장르 */}
          <div className="movie__item__genre">
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          {/* 영화 줄거리 */}
          <div className="movie__item__plot">{plot}</div>
        </div>
      </div>
    </Link>
    // <div className="movie__item">
    //   {/* 영화 포스터 */}
    //   <img src={movie.postImage} className="movie__item__image" />
    //   {/* 영화 제목 */}
    //   <div className="movie__item__info">
    //     <div className="movie__item__title">제목: {movie.title}</div>
    //     {/* 영화 평점 */}
    //     <div className="movie__item__avg">평점: ⭐️ {avg.toFixed(1)}</div>
    //     {/* 영화 개봉일 */}
    //     <div className="movie__item__rat">개봉일: {movie.releasedAt}</div>
    //     {/* 영화 장르 */}
    //     <div className="movie__item__genre">
    //       {movie.genres.map((genre) => (
    //         <span key={genre.id}>{genre.name}</span>
    //       ))}
    //     </div>

    //     {/* 영화 줄거리 */}
    //     <div className="movie__item__plot">{plot}</div>
    //   </div>
    // </div>
  );
}
