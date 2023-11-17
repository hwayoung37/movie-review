import { Link } from "react-router-dom";
import React, { useState } from "react";
import "../style/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// 로고, 검색창, 로그인, 회원가입
export default function Header({ accessToken, setAccessToken }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    // 로그아웃 클릭 시 accessToken 제거
    localStorage.removeItem("accessToken");
    setAccessToken(false);
    alert("로그아웃 되었습니다.");
  };

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
