import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../common/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons"; // regular 스타일 아이콘 가져오기

export default function MovieInfo() {
  const params = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [heart, setHeart] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const heartHandler = () => {
    setHeart(!heart);
  };
  const bookmarkHandler = () => {
    setBookmark(!bookmark);
  };

  const DETAIL_API = `https://moviestates-alternative.codestates-seb.link/movies/${params.movieId}/detail`;

  useEffect(() => {
    setIsLoading(true); // 데이터 가져오기 시작 시 로딩 상태 설정

    fetch(DETAIL_API)
      .then((res) => res.json())
      .then((result) => {
        setMovieDetail(result);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false); // 데이터 가져오기 완료 시 로딩 상태 해제
      });
  }, [params.movieId]);

  //분을 시간과 분으로 나누는 함수
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
  }

  if (movieDetail === null) {
    return <Loading />;
  } else {
    let movieDate = movieDetail.releasedAt; //개봉일

    return (
      <div className="movieInfo">
        {isLoading ? (
          <Loading />
        ) : (
          <>
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
                      <FontAwesomeIcon icon={faHeart} />
                    ) : (
                      <FontAwesomeIcon icon={farHeart} />
                    )}
                  </div>
                  <div onClick={bookmarkHandler} className="icon">
                    {bookmark === false ? (
                      <FontAwesomeIcon icon={farBookmark} />
                    ) : (
                      <FontAwesomeIcon icon={faBookmark} />
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
                  <div>
                    {convertMinutesToHoursAndMinutes(movieDetail.runtime)}{" "}
                  </div>
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
          </>
        )}
      </div>
    );
  }
}
