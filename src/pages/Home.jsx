import "../App.css";
import MovieList from "../component/common/MovieList";
import Banner from "../component/home/Banner";
import MovieGenresList from "../component/home/MovieGenresList";

export default function Home() {
  console.log("home page is rendering!!");
  return (
    <div>
      <Banner />
      <MovieList />
      <h1 className="listTitle">장르별 영화</h1>
      <MovieGenresList
        genreIds="a2052c85-dbe5-4a5d-9906-2fad41208425"
        categoryTitle="영원한 사랑 이야기: 로맨스의 꿈들이 엮이는 곳"
      />
      <MovieGenresList
        genreIds="bb16175d-74a5-4f4e-a14b-129ba18faded"
        categoryTitle="화면을 불태우다. 폭발적인 액션, 잊지 못할 기억"
      />
      <MovieGenresList
        genreIds="2532a966-9d5c-4586-af3b-f3ab83c935a9"
        categoryTitle="웃음이 터진다: 뮤지컬의 경계 없는 매력"
      />
      <MovieGenresList
        genreIds="f1d79c81-3165-4971-ad18-833c042b3f24"
        categoryTitle="상상력 그 이상: 현재의 범위를 넘어선 판타지를 경험하세요"
      />
    </div>
  );
}
