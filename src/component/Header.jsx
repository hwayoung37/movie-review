import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RemoveAccessToken } from "../store";

import "../style/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// 로고, 검색창, 로그인, 회원가입
export default function Header() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken); // Redux에서 accessToken 가져오기

  useEffect(() => {}, [accessToken]);

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/search/${searchTerm}`);
    }
  };

  const handleLogout = () => {
    // 로그아웃 클릭 시 accessToken 제거되는 작업 실행
    dispatch(RemoveAccessToken());
    setSearchTerm("");
    alert("로그아웃 되었습니다.");
  };

  return (
    <div className="header">
      {/* 로고 */}
      <div>
        <Link to="/" onClick={() => setSearchTerm("")}>
          <img src="/logo.png" className="header__logo" alt="logo img" />
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
            onKeyPress={handleOnKeyPress}
          />
          <Link
            to={`/search/${searchTerm}`}
            type="submit"
            className="header_search_btn"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        </form>

        {accessToken === null || accessToken === undefined ? (
          <div>
            <Link to="/login" className="headerRight">
              로그인
            </Link>
            <Link to="/signup">회원가입</Link>
          </div>
        ) : (
          <div>
            <Link to="/" onClick={handleLogout} className="headerRight">
              로그아웃
            </Link>
            <Link to="/mypage">마이페이지</Link>
          </div>
        )}
      </div>
    </div>
  );
}
