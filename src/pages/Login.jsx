import "../Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { AddAccessToken } from "../store";

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false); //이메일 입력 에러

  //이메일 입력 시
  const handleEmailIdChange = (event) => {
    const newEmail = event.target.value;
    setEmailId(newEmail);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!newEmail || emailRegex.test(newEmail)) {
      //email이 입력되어 있지 않거나 newEmail이 emailRegex 정규표현식 패턴에 일치하면 invalidEmail은 false 즉, 오류메세지를 표시하지 않는다.
      setInvalidEmail(false);
    } else {
      setInvalidEmail(true);
    }
  };

  const [password, setPassword] = useState("");
  const [pwdErrorMsg, setPwdErrorMsg] = useState("");

  //패스워드 입력 시
  const handlePwdChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const pweRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).+$/;

    if (newPassword.length === 0) {
      setPwdErrorMsg("");
    } else if (newPassword.length < 8 || newPassword.length > 16) {
      setPwdErrorMsg("최소 8자리에서 최대 16자리까지 입력해주세요.");
    } else if (!pweRegex.test(newPassword)) {
      setPwdErrorMsg("숫자, 영문, 특수문자 각 1개 이상 포함되어야 합니다.");
    } else {
      setPwdErrorMsg("");
    }
  };

  // 로그인
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailId || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    // 서버와의 통신을 통한 로그인 처리
    try {
      const response = await fetch(
        "https://moviestates-alternative.codestates-seb.link/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailId,
            password: password,
          }),
        }
      );

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        // 로그인 성공
        alert("로그인 완료");

        // 토큰 저장
        localStorage.setItem("accessToken", data.accessToken);
        dispatch(AddAccessToken());
        navigate("/"); // 홈 화면 경로로 이동
      } else {
        // 로그인 실패
        alert("유효하지 않은 아이디/패스워드 입니다.");
      }
    } catch (error) {
      console.error(error);
      alert("로그인 도중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="login" id="login">
      <div className="loginBox">
        <div className="loginBox__title">로그인</div>
        <form className="loginBox__loginForm">
          <div className="loginBox__input">
            <input
              className={`loginBox__email ${invalidEmail ? "invalid" : ""}`}
              type="text"
              value={emailId}
              placeholder="이메일을 입력해주세요."
              onChange={handleEmailIdChange}
              required
            />
            {invalidEmail && (
              <p className="errorMsg">유효한 이메일 형식이 아닙니다.</p>
            )}
            <input
              className={`loginBox__pwd ${pwdErrorMsg ? "invalid" : ""}`}
              type="password"
              value={password}
              onChange={handlePwdChange}
              placeholder="비밀번호를 입력해주세요."
              required
            />
            {pwdErrorMsg && <p className="errorMsg">{pwdErrorMsg}</p>}
          </div>
          <button className="loginBox__btn" type="submit" onClick={handleLogin}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
