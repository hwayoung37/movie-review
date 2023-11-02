// import MovieList from '../component/MovieList'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieItem from "../component/common/MovieItem";
import Loading from "../component/common/Loading";
import "../style/search.css";

export default function Search() {
  //파라미터 설정, searchTerm으로 파라미터 접근
  const { searchTerm } = useParams();

  const [searchList, setSearchList] = useState(null);
  const [filteredSearchList, setFilteredSearchList] = useState(null);
  //searchTerm으로 접근한 값을 활용해 API 갖고 오기
  const SERVER_API = `https://moviestates-alternative.codestates-seb.link/movies?page=1&limit=100&title=${searchTerm}&orderBy=NAME&sortBy=asc`;
  //useEffect, fetch로 데이터 갖고오기
  useEffect(() => {
    fetch(SERVER_API)
      .then((response) => response.json())
      .then((result) => {
        setSearchList(result);
        console.log(searchList);
        const filteredMovies = result.data.filter((movie) =>
          movie.title.includes(searchTerm)
        );
        setFilteredSearchList(filteredMovies);
        console.log(filteredSearchList);
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
          <i class="fa-regular fa-circle-xmark fa-lg movie__notSearche-icon " />
          {`'${searchTerm}'(으)로 검색한 결과가 없습니다.`}
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

/* 
1. 페이지 파라미터
일정 갯수 이상 나오면 페이지파라미터로 뭐 다음페이지...아니면 추가 렌더링...

2. 검색어 없을 때 나오는 페이지

*/

// import React, { useState } from 'react';

// export default function MovieSearch() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//     const SERVER_API = "https://moviestates.codestates-seb.link/movies?page=1&limit=20&title=%EC%86%8C%EB%85&orderBy=NAME&sortBy=asc";
//   //useEffect, fetch로 데이터 갖고오기
//   useEffect(() => {
//     fetch(SERVER_API)
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result);
//         setMovieList(result);
//       })
//       //오류처리
//       .catch((e) => console.log(e));
//   }, []);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearchSubmit = (event) => {
//     event.preventDefault();

//     // 여기에 영화 검색 API를 호출하는 코드를 추가할 수 있습니다.
//     // 예를 들어 axios 또는 fetch를 사용하여 API를 호출하고 검색 결과를 가져올 수 있습니다.

//     // 임시로 더미 데이터를 사용한 예시:
//     const dummyResults = [
//       { title: '영화 제목 1', poster: 'URL_1' },
//       { title: '영화 제목 2', poster: 'URL_2' },
//       // ... 여러 영화 결과 데이터 추가
//     ];
//     setSearchResults(dummyResults);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSearchSubmit}>
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           placeholder="영화 검색"
//         />
//         <button type="submit">검색</button>
//       </form>

//       <div className="searchResults">
//         {searchResults.map((movie, index) => (
//           <div key={index} className="movieCard">
//             <img src={movie.poster} alt={movie.title} />
//             <h3>{movie.title}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
