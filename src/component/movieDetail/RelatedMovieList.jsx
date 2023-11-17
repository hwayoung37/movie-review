import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MovieItem from "../common/MovieItem";
import Loading from "../common/Loading";
import "../../style/common/slider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function RelatedMovieList() {
  //movielist 설정 및 초기화
  const [movieList, setMovieList] = useState(null);

  const params = useParams();
  const RELATED_API = `https://moviestates-alternative.codestates-seb.link/movies/${params.movieId}/related`;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(RELATED_API)
      .then((response) => response.json())
      .then((result) => {
        setMovieList(result.slice(0, 10));
      })
      .catch((e) => console.log(e));
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, movieList.length - 1)
    );
  };

  if (movieList === null) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="movieList">
        <h2 className="genreTitle">연관된영화</h2>
        <div className="slider__container">
          <button
            className="slider__btn"
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="movieList__content__slider__related">
            <div
              className="movieList__slider"
              style={{ transform: `translateX(-${currentIndex * 188}px)` }}
            >
              {movieList.map((movie) => (
                <MovieItem type={"slider"} movie={movie} key={movie.id} />
              ))}
            </div>
          </div>
          <button
            className="slider__btn"
            onClick={handleNextClick}
            disabled={currentIndex === movieList.length - 7}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    );
  }
}
