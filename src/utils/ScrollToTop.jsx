import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//페이지 이동시 스크롤이 제일 위로 오도록
function ScrollToTop() {
  const { pathname } = useLocation(); //현재 페이지 경로 정보를 pathname에 저장
  useEffect(() => {
    window.scrollTo(0, 0); //페이지의 스크롤 위치를 (0, 0) 좌표로 이동
  }, [pathname]);
  return null;
}

export default ScrollToTop;
