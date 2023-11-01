import React, { useState } from 'react'
import "../Signup.css";

export default function Signup() {
  // 객체로 사용
  const [form, setForm] = useState({
    email: "",
    password: "",    //property 명 변경했음
    // passwordcheck: "",
    name: "",
    nickname: "",
    birth: ""
  });

  const [passwordcheck, setPasswordcheck] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMsg, setErrorMsg] = useState("")
  const [birthError, setBirthError] = useState("");
  // 이메일

  //   const [emailId, setEmailId] = useState("");
  // const [invalidEmail, setInvalidEmail] = useState(false);

  // const handleEmailIdChange = (event) => {
  //   const value = e.target.value;
  //   setForm({ ...form, email: value })

  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //   if (!value || emailRegex.test(value)) {
  //     setInvalidEmail(false);
  //   } else {
  //     setInvalidEmail(true);
  //   }
  // };

  

  const handleEmailIdChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, email: value })
     validateEmail(value);
    // if (value === "") {
    //   setErrorMsg(""); // 이메일이 빈 문자열인 경우 에러 메시지를 초기화
    // } else if (!value.includes('@') || !value.includes('.')) {
    //   setErrorMsg("이메일 형식으로 입력해주세요.");
    // } else {
    //   setErrorMsg("");
    // }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.length === 0) {
      setEmailError("");
    } else if (!emailRegex.test(email)) {
      setEmailError("유효한 이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, password: value });
    setPasswordError("");
      if (value.length === 0) {
    return;
  }
    if (value.length > 0 && value.length < 8 || value.length > 16) {
      setPasswordError("8자리 이상, 16자리 이하로 입력하세요.");
    }  else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])/.test(value)) {
      setPasswordError("숫자, 영문, 특수문자 각 1개 이상 포함되어야 합니다.");
    }
  }

  

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
  }


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
      const response = await fetch('https://moviestates-alternative.codestates-seb.link/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log('Server response:', data);
      console.log('가입완료');
   
      alert("가입완료");
      // You can handle the response or perform redirection here.
   
    } catch (error) {
      console.error('Error:', error);
      // Handle error here.
    }
  };

  
  // 생년월일
  //지금처럼 입력할 때마다 이벤트 핸들러 발생시키지 말고
  //일단 입력만 받고(텍스트 형태든, date 픽커든...!!)
  //회원가입 버튼 누를 시에만 입력받은 값을 파싱해서 서버에 보내주도록
  // const currentYear = new Date().getFullYear();    //올해년도

  // const [isValid, setIsValid] = useState(true);

  // const handleInputChange = (e) => {
  //   console.log(e);
  //   let inputValue = e.target.value;
  //   let isValidFormat = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/.test(inputValue);

  //   console.log(inputValue);
  //   console.log(isValidFormat);
  //   if (isValidFormat) {
  //     let year = parseInt(inputValue.substr(0, 4));
  //     let month = parseInt(inputValue.substr(4, 2));
  //     let day = parseInt(inputValue.substr(6, 2));

  //     if (year >= 1900 && year <= currentYear && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
  //       setIsValid(true);
  //       setForm({ ...form, birth: inputValue });
  //     } else {
  //       setIsValid(false);
  //       setForm({ ...form, birth: ""  });
  //     }
  //   } else {
  //     setIsValid(false);
  //     setForm({ ...form, birth: "" });
  //   }
  // }


  return (
    // 전체화면에 사진 - 넷플릭스 ui
    // 가운데에 회원가입
    <div className="Signup">
      <div className="signupBox">
        <div className="signupBox__title">회원가입</div>
        <form className="signupBox__loginForm">
          <div className="loginBox__input">
           <input className={`signupBox__email ${emailError ? 'invalid' : ''}`}
            type="text"
            placeholder="이메일"
            value={form.email}
            onChange={handleEmailIdChange} 
             required />
          {emailError  && <p className="errorMsg">{emailError}</p>}

          <input className={`signupBox__password ${passwordError ? 'invalid' : ''}`}
            type="password"
            placeholder="비밀번호"
            value={form.password}
             onChange={handlePasswordChange}
            required/>
         {passwordError && <p className="errorMsg">{passwordError}</p>}

          <input className="signupBox__passwordcheck"
            type="password"
            placeholder="비밀번호 확인"
            value={passwordcheck}
            onChange={(e) => setPasswordcheck(e.target.value)} />
          {passwordcheck.length > 0 && form.password !== passwordcheck && (
            <div className="errorMsg pwc">비밀번호가 일치하지 않습니다.</div>
          )}
          {/* <div className={form.password === form.passwordcheck ? "pwc none" : "pwc"}>비밀번호가 일치하지 않습니다.</div>          */}

          <input className="signupBox__name"
            type="text"
            placeholder="이름"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <input className="signupBox__nickname"
            type="text"
            placeholder="닉네임"
            value={form.nickname}
            onChange={(e) => setForm({ ...form, nickname: e.target.value })} />

          <input className={`signupBox__date ${birthError ? 'invalid' : ''}`}
            type="text" 
            value={form.birth} 
            placeholder="생년월일(YYYYMMDD)"
            onChange={handleBirthChange} />
             {birthError && <p className="errorMsg">{birthError}</p>}
          {/* <input className="signupBox__date"
            type="date"
            placeholder="생년월일(YYYYMMDD)"
            value={form.birth}
            onChange={(e) => setForm({ ...form, birth: e.target.value })}
            id="test"
          /> */}
          {/* {!isValid && <p style={{ color: 'red' }}>올바른 형식의 생년월일을 입력해주세요.</p>} */}
        </div>
          <button className="signupBox__btn" type="submit" onClick={handleSubmit}>회원가입</button>
        </form>
      </div>
    </div>

  )

}

// 1. 유효성 검사 적용할 것
// 작성 도중에는 에러메시지 안뜨다가
// 작성 후 넘어갔을 때 에러메시지가 뜨도록 하는 경우도 고려해볼 것

// 2. 함수화 시킬 것
// 작은 기능은 함수로 만들어서 utils 폴더 만들기
// import 함수~
// 네트워크도 ㄱㄱ

// 3. 에러페이지 구현

// ㅇ