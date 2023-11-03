import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../style/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// 로고, 검색창, 로그인, 회원가입
export default function Header() {
  // useEffect(() => {
  //     if (localStorage.getItem('accessToken') === null) {
  //       window.location.replace('http://localhost:3000/')
  //     }
  //   }, []);

  //  const [accessToken, setAccessToken] = useState();
  // let accessToken = localStorage.getItem('accessToken');
  //   useEffect(() => {
  //    setAccessToken(localStorage.getItem('accessToken'))
  //     console.log(accessToken);

  // }, [accessToken])

  // console.log(accessToken);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    // 로그아웃 클릭 시 accessToken 제거
    localStorage.removeItem("accessToken");
    setAccessToken(false);
  };
  //이게 아닌가??? -> 아닌걸로..ㅎ
  // const [searchUrl, setSearchUrl] = useState(``)
  // const handleUrlChange = () => {
  //   setSearchUrl(`/search/${searchTerm}`)
  // }

  //이거 맞는거 같은데 로직이 안떠오른다 으아 머리터져ㅎ...
  //여기가 아니라 서치에서 했어야 함ㅇㅇ
  // useEffect(()=> {

  // }, [searchUrl])

  return (
    <div className="header">
      {/* 로고 */}
      <div>
        <Link to="/">
          <img src="/logo.png" className="header__logo" />
        </Link>
      </div>
      <div className="header__category">
        {/* 검색기능 */}
        <form className="header__search__form">
          <input
            type="text"
            className="header__search__input"
            placeholder="영화 제목을 입력하세요."
            value={searchTerm}
            onChange={handleInputChange}
          />
          {/* 
          input의 value가 변경되면 onChange에 연결된 handleInputChange 함수가 수행되고
          setSearchTerm을 이용해서 searchTerm이 변경된다.
          아이콘을 클릭하면 변경된 searchTerm 값을 받아서 url이 변경되면서 해당 url로 이동한다.
          */}
          <Link
            to={`/search/${searchTerm}`}
            type="submit"
            className="header_search_btn"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        </form>

        {accessToken ? (
          <div>
            <Link to="/" onClick={handleLogout} className="headerRight">
              로그아웃
            </Link>
            <Link to="/mypage">마이페이지</Link>
          </div>
        ) : (
          <div>
            <Link to="/login" className="headerRight">
              로그인
            </Link>
            <Link to="/signup">회원가입</Link>
          </div>
        )}
      </div>
    </div>
  );
}
