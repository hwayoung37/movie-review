import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

import Header from "./component/Header";
import Footer from "./component/Footer";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import MyPage from "./pages/MyPage";

import ScrollToTop from "./utils/ScrollToTop";
import "./App.css";

export default function App() {
  //accessToken으로 로그인 확인
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  //새로고침 시 header의 accessToken이 undefined가 되는데, 이것은 리액트를 새로고침하면 모든것이 초기상태로 돌아가기 때문이다.
  //초기값을 미리 로컬스토리지에서 가져온 값으로 설정하면 새로고침했을 때도 로컬스토리지의 값을 가지고 올 수 있다.

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <Header accessToken={accessToken} setAccessToken={setAccessToken} />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* movieId 라는 파라미터를 활용해 url을 설정, 접근할 것 */}
            <Route path="/movie/:movieId" element={<MovieDetail />} />
            <Route
              path="/login"
              element={<Login setAccessToken={setAccessToken} />}
            />
            <Route path="/signup" element={<Signup />} />
            {/* searchTerm 이라는 파라미터를 활용해 url을 설정, 접근할 것 */}
            <Route path="/search/:searchTerm" element={<Search />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
