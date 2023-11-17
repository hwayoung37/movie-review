import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../style/banner.css";

export default function Banner() {
  const [data, setData] = useState(null);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  //숫자 랜덤 발생
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const randPage = getRandomNumber(1, 10);
  const randLimit = getRandomNumber(1, 5);

  const SERVER_API = `https://moviestates-alternative.codestates-seb.link/movies?page=${randPage}&limit=${randLimit}&sortBy=asc`;

  useEffect(() => {
    fetch(SERVER_API)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    //이미지 변경을 위한 타이머 설정
    const interval = setInterval(() => {
      // 이미지를 순환하도록 인덱스 변경
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000); // 15초마다 이미지 변경

    return () => clearInterval(interval);
  }, [data]);

  function limitTextLength(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  if (data === null) {
    return <div></div>;
  } else {
    return (
      <div className="banner">
        {data.map((movie, index) => (
          <div
            key={movie.id}
            className={`banner__movie ${
              index === currentMovieIndex ? "active" : ""
            }`}
          >
            <div className="banner__image-wrapper">
              <img
                className="banner__image"
                src={movie.postImage}
                alt="Movie Banner"
              />
            </div>

            <div className="movie__info">
              <img
                className="movie__info-image"
                src={movie.postImage}
                alt={movie.alt}
              />
              <div className="movie__info-text">
                <div className="movie__title-container">
                  <h2 className="movie__title">{movie.title}</h2>
                  <Link to={`/movie/${movie.id}`}>
                    <button className="movie__title-btn">더보기</button>
                  </Link>
                </div>
                <p className="movie__plot">
                  {limitTextLength(movie.plot, 200)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
