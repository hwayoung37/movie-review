import MovieItem from "./MovieItem";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import "../../style/common/movieList.css";

export default function MovieList() {
  const [movieList, setMovieList] = useState(null);
  const SERVER_API =
    "https://moviestates-alternative.codestates-seb.link/movies/top";

  useEffect(() => {
    fetch(SERVER_API)
      .then((response) => response.json())
      .then((result) => {
        setMovieList(result);
      })
      .catch((e) => console.log(e));
  }, []);

  if (movieList === null) {
    return <Loading />;
  } else {
    return (
      <div className="movieList">
        <h1 className="listTitle">
          엔터테인먼트의 극치: TOP 10 영화로 가는 여정
        </h1>
        <div className="movieList_content">
          {movieList.data.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }
}
