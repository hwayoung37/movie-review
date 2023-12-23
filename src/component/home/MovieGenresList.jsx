import { useState, useEffect } from "react";
import GenresSlider from "./GenresSlider";
import "../../style/common/movieList.css";

export default function MovieGenresList({ genreIds, categoryTitle }) {
  //movielist 설정 및 초기화
  const [movieList, setMovieList] = useState(null);

  const SERVER_API = `https://moviestates-alternative.codestates-seb.link/movies/genre?page=1&limit=10&genreIds=${genreIds}`;

  useEffect(() => {
    fetch(SERVER_API)
      .then((response) => response.json())
      .then((result) => {
        setMovieList(result);
      })
      .catch((e) => console.log(e));
  }, []);

  if (movieList === null) {
    return <div></div>;
  } else {
    return (
      <div className="movieList">
        <h2 className="genreTitle">{categoryTitle}</h2>
        <GenresSlider genreIds={genreIds} />
      </div>
    );
  }
}
