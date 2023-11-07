import "./App.css";
import "./Login.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import MyPage from "./pages/MyPage";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import Search from "./pages/Search";
import Signup from "./pages/Signup";

import ScrollToTop from "./utils/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* 컴포넌트이기때문에 열린태그/닫힘태그 사용안됨 */}
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* movieId 라는 파라미터를 활용해 url을 설정, 접근할 것 */}
            <Route path="/movie/:movieId" element={<MovieDetail />} />
            <Route path="/login" element={<Login />} />
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
