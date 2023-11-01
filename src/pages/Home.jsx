import "../App.css";
import MovieList from "../component/MovieList";
import Banner from "../component/Banner";
import MovieGenresList from "../component/MovieGenresList";

export default function Home() {
  console.log("home page is rendering!!");
  return (
    <div>
      <Banner />
      <MovieList />
      <h1 className="listTitle">장르별 영화</h1>
      <MovieGenresList
        genreIds="7b7fe27c-c6e5-491d-967c-fccff40d7f81"
        categoryTitle="영원한 사랑 이야기: 로맨스의 꿈들이 엮이는 곳"
      />
      <MovieGenresList
        genreIds="921117da-f038-486e-baa8-32e1bcc356e6"
        categoryTitle="화면을 불태우다. 폭발적인 액션, 잊지 못할 기억"
      />
      <MovieGenresList
        genreIds="9d70f853-e452-455a-aafd-a8f12dd2bbc8"
        categoryTitle="웃음이 터진다: 코미디의 경계 없는 매력"
      />
      <MovieGenresList
        genreIds= "0c3670aa-c64a-4b95-87e9-9237db111a96"
        categoryTitle="상상력 그 이상: 현재의 범위를 넘어선 판타지를 경험하세요"
      />
    </div>
  );
}
