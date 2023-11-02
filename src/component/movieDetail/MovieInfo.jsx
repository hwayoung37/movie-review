import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../common/Loading";

export default function MovieInfo() {
  const [heart, setHeart] = useState(false);
  const heartHandler = () => {
    console.log("클릭");
    setHeart(!heart);
  };
  const [bookmark, setBookmark] = useState(false);
  const bookmarkHandler = () => {
    console.log("클릭");
    setBookmark(!bookmark);
  };

  const params = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const DETAIL_API = `https://moviestates-alternative.codestates-seb.link/movies/${params.movieId}/detail`;
  //중복되는 fetch부분 따로 뺴서 한꺼번에 ㄱㄴ하도록 고려해볼 것 -> promise.all promise.allsettled
  useEffect(() => {
    fetch(DETAIL_API)
      .then((res) => res.json())
      .then((result) => {
        setMovieDetail(result);
      })
      .catch((e) => console.log(e));
  }, []);
  //서버 에러시 연결되는 페이지 구현

  function convertMinutesToHoursAndMinutes(minutes) {
    if (minutes === null) {
      return "입력된 값이 없습니다.";
    }

    const parsedMinutes = parseInt(minutes);
    // 문자를 정수(숫자)로 변환하는 함수

    if (isNaN(parsedMinutes)) {
      return "유효하지 않은 입력 값입니다.";
    }
    //  변환된 정수 값인 parsedMinutes가 숫자가 아니라면 (숫자로 변환이 실패한 경우) '유효하지 않은 입력 값입니다.'라는 문자열을 반환하는 부분

    const hours = Math.floor(parsedMinutes / 60);
    // const hours = parsedMinutes / 60; 소수점까지 다 나와서 시간을 나타내는 수로 사용하기에는 부적절
    const remainingMinutes = parsedMinutes % 60;

    const hoursText = hours > 0 ? `${hours}시간` : "";
    const minutesText = remainingMinutes > 0 ? `${remainingMinutes}분` : "";

    if (hoursText && minutesText) {
      return `${hoursText} ${minutesText}`;
    } else if (hoursText) {
      return hoursText;
    } else if (minutesText) {
      return minutesText;
    } else {
      return "0분";
    }
  } // 분을 시간,분으로 나누는 함수

  if (movieDetail === null) {
    return <Loading />;
  } else {
    let movieDate = movieDetail.releasedAt; //개봉일

    return (
      <div className="movieInfo">
        <div className="movieInfo_bg_wrapper">
          <img
            className="movieInfo__bg"
            src={movieDetail.postImage}
            alt="Movie Banner"
          />
        </div>
        <section className="movieInfo__content">
          <div className="movieInfo__content__poster">
            <img className="movieInfo__img" src={movieDetail.postImage} />
            <div className="movieInfo__emoticon">
              <div onClick={heartHandler} className="icon">
                {heart ? (
                  <i class="fa-solid fa-heart" />
                ) : (
                  <i className="fa-regular fa-heart" />
                )}
              </div>
              <div onClick={bookmarkHandler} className="icon">
                {bookmark === false ? (
                  <i className="fa-regular fa-bookmark" />
                ) : (
                  <i class="fa-solid fa-bookmark" />
                )}
              </div>
            </div>
          </div>
          <div className="movieInfo__content__detail">
            <div className="movieInfo__title">
              <div className="title"> {movieDetail.title} </div>
              {movieDetail.averageScore === null ? (
                <div>평가된 평점이 없습니다.</div>
              ) : (
                <h3>⭐ {movieDetail.averageScore.toFixed(1)}</h3>
              )}
            </div>
            <div className="movieInfo__align">
              <div className="movieInfo__category__title">개봉일</div>
              <div>
                {movieDate === null
                  ? "개봉일 정보가 없습니다."
                  : `${movieDate.slice(0, 4)}-${movieDate.slice(
                      4,
                      6
                    )}-${movieDate.slice(6, 8)}`}
              </div>
            </div>
            <div className="movieInfo__align">
              <div>상영시간</div>
              <div>{convertMinutesToHoursAndMinutes(movieDetail.runtime)} </div>
            </div>
            <div className="movieInfo__align">
              <div>장르</div>
              <div className="movieInfo__content__genres">
                {movieDetail.genres.map((genre) => (
                  <div key={genre.id}>{genre.name}</div>
                ))}
              </div>
            </div>
            <div className="movieInfo__align__staff">
              <div>출연/제작</div>
              <div className="movieInfo__content__staff">
                {movieDetail.staffs.map((staff) => (
                  <div key={staff.id}>
                    {" "}
                    {staff.role}: {staff.name}{" "}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="movieInfo__content__plot">
          <h3>줄거리</h3>
          <div> {movieDetail.plot} </div>
        </section>
      </div>
    );
  }
}

/* <section className='movieInfo__title'>
          <h1> {movieDetail.title} </h1>
           {movieDetail.averageScore === null ? <div>평가된 평점이 없습니다.</div> : <h3>⭐ {movieDetail.averageScore.toFixed(1)}</h3> } 
        </section> */
