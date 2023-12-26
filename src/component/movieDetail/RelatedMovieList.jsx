import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MovieSlider from "../common/MovieSlider";
import Loading from "../common/Loading";

export default function RelatedMovieList() {
  //movielist 설정 및 초기화
  const [movieList, setMovieList] = useState(null);

  const params = useParams();
  const RELATED_API = `https://moviestates-alternative.codestates-seb.link/movies/${params.movieId}/related`;

  useEffect(() => {
    fetch(RELATED_API)
      .then((response) => response.json())
      .then((result) => {
        setMovieList(result.slice(0, 10));
      })
      .catch((e) => console.log(e));
  }, []);

  if (movieList === null) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="relatedMovieList">
        <h2 className="genreTitle">연관된영화</h2>
        <MovieSlider />
      </div>
    );
  }
}
