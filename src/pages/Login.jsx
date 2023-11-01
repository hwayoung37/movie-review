import "../Login.css";
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
   const navigate = useNavigate();
  
  const [emailId, setEmailId] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);

  const handleEmailIdChange = (event) => {
    const newEmail = event.target.value;
    setEmailId(newEmail);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!newEmail || emailRegex.test(newEmail)) {
      setInvalidEmail(false);
    } else {
      setInvalidEmail(true);
    }
  };

  const [password, setPassword] = useState("");
  const [pwdErrorMsg, setPwdErrorMsg] = useState("");

  const handlePwdChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (newPassword.length === 0) {
      setPwdErrorMsg(""); 
    }
    else if (newPassword.length < 8 || newPassword.length > 16) {
      setPwdErrorMsg('최소 8자리에서 최대 16자리까지 입력해주세요.');
    }
    else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])/.test(newPassword)) {
      setPwdErrorMsg('숫자, 영문, 특수문자 각 1개 이상 포함되어야 합니다.');
    }
    else {
      setPwdErrorMsg('');
    }
  };


//   로그인
    const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailId || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }


    // 서버와의 통신을 통한 로그인 처리
    try {
      const response = await fetch('https://moviestates-alternative.codestates-seb.link/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        email: emailId,
        password: password
        }),
      });

      const data = await response.json();
      console.log('Server response:', data);
      console.log('로그인');
   
      
      
      // 서버에 email과 password 전송 후 응답 받기
      // 실제로는 여기서 API 호출 등의 로직이 들어갈 것입니다.
      // 일치 여부에 따라 로그인 성공 또는 실패 처리
      
      // 예시: 미리 등록된 사용자 정보를 간단히 비교하는 예시
      // if (email === 'user@example.com' && password === 'password123') {
      //   // 로그인 성공
      //   alert('성');
      
      //   // 로그인 성공 시 리다이렉션 등의 동작 수행
      // } else {
      //   // 로그인 실패
      //   alert('Invalid email or password.');
      // }
          if (response.ok) {
      // 로그인 성공
      alert("로그인 완료");

      // 토큰 저장
      localStorage.setItem('accessToken', data.accessToken);
            navigate('/'); // 홈 화면 경로로 이동
            
        // 로그인 성공 후 새로고침
        window.location.reload(); // 새로고침 실행

      // 로그인 성공 시 리다이렉션 등의 동작 수행
    } else {
      // 로그인 실패
      alert('유효하지 않은 아이디/패스워드 입니다.');
    }
    } 
      catch (error) {
      console.error(error);
      alert('로그인 도중 문제가 발생했습니다.');
    }
  };

  

   return (
    <div className="login" id="login">
      <div className="loginBox">
        <div className="loginBox__title">로그인</div>
        <form className="loginBox__loginForm">
          <div className="loginBox__input">
         <input
              className={`loginBox__email ${invalidEmail ? 'invalid' : ''}`}
              type="text"
              value={emailId}
              placeholder="이메일을 입력해주세요."
              onChange={handleEmailIdChange}
              required
            />
            {invalidEmail && emailId && <p className="errorMsg">유효한 이메일 형식이 아닙니다.</p>}
            {/* 이메일이 빈 문자열이 아닌 경우에만 에러 메시지 표시 */}
            <input
              className={`loginBox__pwd ${pwdErrorMsg ? 'invalid' : ''}`}
              type="password"
              value={password}
              onChange={handlePwdChange}
              placeholder="비밀번호를 입력해주세요."
              required
            />
            {pwdErrorMsg && <p className="errorMsg">{pwdErrorMsg}</p>}
          </div>
          <button className="loginBox__btn" type="submit" onClick={handleLogin} >로그인</button>
        </form>
      </div>
    </div>
  );
}

// import "../Login.css";
// import { useState } from 'react'

// export default function LogIn() {
//   //이메일 로그인 유효성
//   const [emailId, setEmailId] = useState("")
//   const [errorMsg, setErrorMsg] = useState("")

//   const handleEmailIdChange = (e) => {
//     const value = e.target.value;
//     setEmailId(value);

//     if (value === "") {
//       setErrorMsg(""); // 이메일이 빈 문자열인 경우 에러 메시지를 초기화
//     } else if (!value.includes('@') || !value.includes('.')) {
//       setErrorMsg("이메일 형식으로 입력해주세요.");
//     } else {
//       setErrorMsg("");
//     }
//   }
//   //패스워드 로그인 유효성
//   const [password, setPassword] = useState("");
//   const [pwdErrorMsg, setPwdErrorMsg] = useState("");

//   const handlePwdChange = (event) => {
//     const newPassword = event.target.value;
//     setPassword(newPassword);

//     if (newPassword.length === 0) {
//       setPwdErrorMsg(""); 
//     }
//     else if (newPassword.length < 8 || newPassword.length > 16) {
//       setPwdErrorMsg('최소 8자리에서 최대 16자리까지 입력해주세요.');
//     }
//     else if (!/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword) || !/[$@$!%*#?&]/.test(newPassword)) {
//       setPwdErrorMsg('숫자, 영문, 특수문자 각 1개 이상 포함되어야 합니다.');
//     }
//     else {
//       setPwdErrorMsg('');
//     }
//   };


//   return (
//     <div className="login" id="login">
//       <div className="loginBox">
//         <div className="loginBox__title">로그인</div>
//         <form className="loginBox__loginForm">
//           <div className="loginBox__input">
//             <input
//               className={`loginBox__email ${errorMsg ? 'invalid' : ''}`}
//               type="text"
//               value={emailId}
//               placeholder="이메일을 입력해주세요."
//               onChange={handleEmailIdChange}
//               required
//             />
//             {errorMsg && <p className="errorMsg">{errorMsg}</p>}
//             <input
//               className={`loginBox__pwd ${pwdErrorMsg ? 'invalid' : ''}`}
//               type="password"
//               value={password}
//               onChange={handlePwdChange}
//               placeholder="비밀번호를 입력해주세요."
//               required
//             />
//             {pwdErrorMsg && <p className="errorMsg">{pwdErrorMsg}</p>}
//           </div>
//           <button className="loginBox__btn" type="submit">로그인</button>
//         </form>
//       </div>
//     </div>
//   )
// }

/* 로직1 -> 오류
// import "../Login.css";
import {useState} from 'react'

export default function LogIn() {
  //로직 1
  const [emailId, setEmailId] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [invalid, setInvalid] = useState(false);

  const handleEmailIdChange = (e) => {
    const value=e.target.value;
    setEmailId(value)
    //로직2
    // if (!isValidEmail(value)) {
    //   setErrorMessage('유효한 이메일 형식이 아닙니다.');
    // } else {
    //   setErrorMessage('');
    // }
    //로직1
    if(!emailId.includes('@') || !emailId.includes('.')) {
      setErrorMsg("이메일 형식으로 입력해주세요.")
      setInvalid(true);
    }
    else {
      setErrorMSG("")
      setInvalid(false);
    }
      
  }

  // const isValidEmail = (email) => {
  //   const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //   return pattern.test(email);
  // };

  
  return (

    // 전체화면에 사진 - 넷플릭스 ui
    // 가운데에 로그인
    <div className="login" id="login">
      <div className="loginBox">
        <form className="loginBox__loginForm">
          <div className="loginBox__input">
            <input 
              className="loginBox__email"
              type="text" 
              value={emailId}
              placeholder="이메일을 입력해주세요." 
              onChange={handleEmailIdChange}
              required/>
            { errorMsg && <p className="errorMsg">{errorMsg}</p>}
            { @와 . 포함 안되어있을 경우 -> 이메일 형식으로 입력해주세요. 
           if (입력된 문자열.indexOf("@") === -1 || 입력된 문자열.indexOf(".") === -1) { return alert('이메일 형식으로 입력해주세요.')}}
            <input 
              className="loginBox__pwd" 
              type="password" 
              placeholder="비밀번호를 입력해주세요."
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$"
              required/>
            {/* input태그 pattern속성 활용 - 최소 8자리에서 최대 16자리까지 숫자, 영문, 특수문자 각 1개 이상 포함 (암호 유효성 검사에 유용) }
          </div>
          
          <button className="loginBox__btn" type="submit">로그인</button>
        </form>
      </div>
    </div>
    
  )

}

*/

/* pwd 유효성 속성 활용
pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$"
              title="최소 8자리에서 최대 16자리까지 숫자, 영문, 특수문자 각 1개 이상 포함"
*/


