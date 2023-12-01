import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

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
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:movieId" element={<MovieDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search/:searchTerm" element={<Search />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
