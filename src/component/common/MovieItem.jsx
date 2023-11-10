import { Link } from "react-router-dom";
import limitTextLength from "../../utils/limitTextLength";
import "../../style/common/movieItem.css";

export default function MovieItem({ movie, type }) {
  const MovieItemType = ["slider"].includes(type) ? type : "default";

  const avg = movie.averageScore || 0; //movie.averageScore가 있으면 그대로 없으면 0

  const plot = limitTextLength(movie.plot, 70);

  const releasedAt = `${movie.releasedAt.slice(0, 4)}-${movie.releasedAt.slice(
    4,
    6
  )}-${movie.releasedAt.slice(6, 8)}`;

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className={[`movieItem`, `type_${MovieItemType}`].join(" ")}>
        <img
          src={movie.postImage}
          className={[`movieItem_img`, `type_${MovieItemType}`].join(" ")}
        />
        <div className="movieItem_info">
          <h3 className="movieItem_title"> {movie.title}</h3>
          <div className="movieItem_avg">평점: ⭐️ {avg.toFixed(1)}</div>
          <div className="movieItem_rat">개봉일: {releasedAt}</div>
          <div className="movieItem_genre">
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <div className="movieItem_plot">{plot}</div>
        </div>
      </div>
    </Link>
  );
}

MovieItem.defaultProps = {
  type: "default",
};
