import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MovieItem from "../component/common/MovieItem";
import Loading from "../component/common/Loading";
import "../style/search.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  //파라미터 설정, searchTerm으로 파라미터 접근
  const { searchTerm } = useParams();
  const [searchList, setSearchList] = useState(null); // 제목, 감독, 배우에서 searchTerm이 포함된 모든 영화
  const [filteredSearchList, setFilteredSearchList] = useState(null); //searchTerm이 제목에서만 포함된 영화

  //searchTerm으로 접근한 값을 활용해 API 갖고 오기
  const SERVER_API = `https://moviestates-alternative.codestates-seb.link/movies?page=1&limit=100&title=${searchTerm}&orderBy=NAME&sortBy=asc`;

  //useEffect, fetch로 데이터 갖고오기
  useEffect(() => {
    fetch(SERVER_API)
      .then((response) => response.json())
      .then((result) => {
        setSearchList(result);
        console.log("searchList:", searchList);
        const filteredMovies = result.data.filter((movie) =>
          movie.title.includes(searchTerm)
        );
        setFilteredSearchList(filteredMovies);
      })

      //오류처리
      .catch((e) => console.log(e));
  }, [searchTerm]);
  //searchTerm 값이 변경될 때마다 fetch함수가 실행되도록 useEffect를 설정

  if (filteredSearchList === null) {
    return <Loading />;
  } else if (Object.keys(searchList.data).length === 0) {
    return (
      <div>
        <div className="movie__notSearche">
          <FontAwesomeIcon icon={faGhost} />
          {` '${searchTerm}'(으)로 검색한 결과가 없습니다.`}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="movie__search__result">{`'${searchTerm}' (으)로 검색한 결과입니다.`}</div>
        <div className="movie__searches">
          {filteredSearchList.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }
}
