import "./App.css";
import "./Login.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MovieItem from "./component/MovieItem";
// import MovieList from "./component/MovieList";
import Header from "./component/Header";
import Footer from "./component/Footer";
import MyPage from "./component/MyPage";
import Loading from "./component/Loading";
// import MovieGenresList from "./component/MovieGenresList";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetail from './pages/MovieDetail'
import Search from './pages/Search'
import Signup from './pages/Signup'

export default function App() {
  return (
    <BrowserRouter>
    <div className="app">
      <Header />
      
      <main className="main">
        {/* <MovieList />
        <MovieGenresList genreIds="73fa7e1d-0e3e-4506-9432-21c29faa8dd7" categoryTitle="로맨스/연애" />
        <MovieGenresList genreIds="7d663bf1-14fe-4320-b409-7d70ddd21560" categoryTitle="드라마" /> */}
        {/* <Home /> */}
        {/* 2번째 미션 라우팅 기능 */}
        {/* <Login /> */}
        <Routes>
          <Route path='/' element={<Home />} />
           {/* movieId 라는 파라미터를 활용해 url을 설정, 접근할 것 */}
          <Route path='/movie/:movieId' element={<MovieDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {/* searchTerm 이라는 파라미터를 활용해 url을 설정, 접근할 것 */}
          <Route path='/search/:searchTerm' element={<Search />} />
          <Route path='/mypage' element={<MyPage />} />
        </Routes>       
      </main>
      <Footer />
    </div>
    </BrowserRouter>
  );
}
