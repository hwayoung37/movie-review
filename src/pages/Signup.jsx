import React, { useState } from "react";
import "../Signup.css";

export default function Signup() {
  // 객체로 사용
  const [form, setForm] = useState({
    email: "",
    password: "", //property 명 변경했음
    name: "",
    nickname: "",
    birth: "",
  });

  const [passwordcheck, setPasswordcheck] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [birthError, setBirthError] = useState("");

  const handleEmailIdChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, email: value });
    validateEmail(value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.length === 0) {
      setEmailError("");
    } else if (!emailRegex.test(email)) {
      setEmailError("유효한 이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, password: value });
    setPasswordError("");
    if (value.length === 0) {
      return;
    }
    if ((value.length > 0 && value.length < 8) || value.length > 16) {
      setPasswordError("8자리 이상, 16자리 이하로 입력하세요.");
    } else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])/.test(value)) {
      setPasswordError("숫자, 영문, 특수문자 각 1개 이상 포함되어야 합니다.");
    }
  };

  const handleBirthChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, birth: value });
    setBirthError("");

    if (value.length === 0) {
      return;
    }
    if (!/^\d{8}$/.test(value)) {
      setBirthError("8자리 숫자로 입력하세요.");
      return;
    }
    const year = parseInt(value.substring(0, 4));
    const month = parseInt(value.substring(4, 6));
    const day = parseInt(value.substring(6, 8));

    if (year < 1900 || month < 1 || month > 12 || day < 1 || day > 31) {
      setBirthError("올바른 생년월일 형식이 아닙니다.");
    }
  };

  //회원가입
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError.length !== 0) {
      alert("유효한 이메일 형식이 아닙니다.");
      return;
    }

    if (passwordError.length !== 0) {
      alert("유효한 패스워드 형식이 아닙니다.");
      return;
    }

    if (birthError.length !== 0) {
      alert("유효한 생년월일 형식이 아닙니다.");
      return;
    }

    if (form.password !== passwordcheck) {
      alert("Passwords don't match.");
      return;
    }

    try {
      const response = await fetch(
        "https://moviestates-alternative.codestates-seb.link/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      console.log("Server response:", data);

      alert("가입완료");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="Signup">
      <div className="signupBox">
        <div className="signupBox__title">회원가입</div>
        <form className="signupBox__loginForm">
          <div className="loginBox__input">
            <input
              className={`signupBox__email ${emailError ? "invalid" : ""}`}
              type="text"
              placeholder="이메일"
              value={form.email}
              onChange={handleEmailIdChange}
              required
            />
            {emailError && <p className="errorMsg">{emailError}</p>}

            <input
              className={`signupBox__password ${
                passwordError ? "invalid" : ""
              }`}
              type="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && <p className="errorMsg">{passwordError}</p>}

            <input
              className="signupBox__passwordcheck"
              type="password"
              placeholder="비밀번호 확인"
              value={passwordcheck}
              onChange={(e) => setPasswordcheck(e.target.value)}
            />
            {passwordcheck.length > 0 && form.password !== passwordcheck && (
              <div className="errorMsg pwc">비밀번호가 일치하지 않습니다.</div>
            )}

            <input
              className="signupBox__name"
              type="text"
              placeholder="이름"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="signupBox__nickname"
              type="text"
              placeholder="닉네임"
              value={form.nickname}
              onChange={(e) => setForm({ ...form, nickname: e.target.value })}
            />

            <input
              className={`signupBox__date ${birthError ? "invalid" : ""}`}
              type="text"
              value={form.birth}
              placeholder="생년월일(YYYYMMDD)"
              onChange={handleBirthChange}
            />
            {birthError && <p className="errorMsg">{birthError}</p>}
          </div>
          <button
            className="signupBox__btn"
            type="submit"
            onClick={handleSubmit}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
