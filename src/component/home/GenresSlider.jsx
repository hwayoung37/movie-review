import React, { useCallback } from "react";
import Slider from "react-slick";

import "../../style/slider/slick.css";
import "../../style/slider/slick-theme.css";

import { useState, useEffect } from "react";
import MovieItem from "../common/MovieItem";

export default function GenresSlider({ genreIds }) {
  //movielist 설정 및 초기화
  const [movieList, setMovieList] = useState([]);

  const SERVER_API = `https://moviestates-alternative.codestates-seb.link/movies/genre?page=1&limit=10&genreIds=${genreIds}`;

  useEffect(() => {
    fetch(SERVER_API)
      .then((response) => response.json())
      .then((result) => {
        // const result = await response.json();
        const res = result.data;
        setMovieList(res);
      })
      .catch((e) => console.log(e));
  }, []);

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
        {/* <div className="movieList__slider"> */}
        {movieList.map((movie) => (
          <MovieItem type={"slider"} movie={movie} key={movie.id} />
        ))}
        {/* </div> */}
      </Slider>
    </div>
  );
}
