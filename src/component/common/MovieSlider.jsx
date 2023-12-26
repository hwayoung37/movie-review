import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Slider from "react-slick";
import "../../style/slider/slick.css";
import "../../style/slider/slick-theme.css";

import MovieItem from "../common/MovieItem";

export default function MovieSlider({ genreIds }) {
  //movielist 설정 및 초기화
  const [movieList, setMovieList] = useState([]);

  const params = useParams();

  const SERVER_API = `https://moviestates-alternative.codestates-seb.link/movies/genre?page=1&limit=10&genreIds=${genreIds}`;
  const RELATED_API = `https://moviestates-alternative.codestates-seb.link/movies/${params.movieId}/related`;

  useEffect(() => {
    if (genreIds) {
      fetch(SERVER_API)
        .then((response) => response.json())
        .then((result) => {
          const res = result.data;
          setMovieList(res);
          console.log("genreIds:", genreIds);
        })
        .catch((e) => console.log(e));
    } else if (params.movieId) {
      fetch(RELATED_API)
        .then((response) => response.json())
        .then((result) => {
          console.log("result:", result);
          const res = result.slice(0, 10);
          setMovieList(res);
        })
        .catch((e) => console.log(e));
    }
  }, []);
  console.log("movieList:", movieList);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    arrow: true,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {movieList.map((movie) => (
          <MovieItem type={"slider"} movie={movie} key={movie.id} />
        ))}
      </Slider>
    </div>
  );
}
