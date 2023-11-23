import "./modal.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import userIcon from "../../../../assets/img/person.png";
import passwordIcon from "../../../../assets/img/password.png";
import emailIcon from "../../../../assets/img/email.png";

import { useRecoilState, useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { loginedUserState } from "../../../../atoms/login";
import { loginState } from "../../../../atoms/login";
import { loginTokenState } from "../../../../atoms/login";

const Modal = ({ closeModal }) => {
  const [action, setAction] = useState("login");
  // 로그인 > 유저 입력 (아이디, 비밀번호)
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // 회원가입 > 유저 입력 (이름, 아이디, 비밀번호, 이메일)
  const [signupName, setSignupName] = useState("");
  const [signupId, setSignupId] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");

  // 로그인, 회원가입 클릭 여부
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  //로그인 토큰
  const [loginToken, setLoginToken] = useRecoilState(loginTokenState);
  const setLoginedUser = useSetRecoilState(loginedUserState);

  // 로그인한 유저의 정보 (토큰을 디코딩해서 받아옴)
  const loginedUser = useRecoilValue(loginedUserState);

  // 관리자 페이지 이동
  const navigate = useNavigate();
  const { admin } = useLocation();

  // 로그인 value 세팅
  const handleUserId = (e) => {
    setUserId(e.target.value);
  };

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  // 회원가입 value 세팅
  const handleSignupName = (e) => {
    setSignupName(e.target.value);
  };

  const handleSignupId = (e) => {
    setSignupId(e.target.value);
  };

  const handleSignupPassword = (e) => {
    setSignupPassword(e.target.value);
  };

  const handleSignupEmail = (e) => {
    setSignupEmail(e.target.value);
  };

  // 로그인 버튼 클릭 시 처리
  const handleLogin = async () => {
    try {
      const loginData = {
        id: userId,
        pw: userPassword,
      };

      const response = await axios.post("http://localhost/api/user/login", loginData);

      console.log(response.data.token);
      const token = response.data.token; // 서버로부터 받아온 토큰 키 저장
      setLoginToken(token);
      localStorage.setItem("accessToken", token);
      setIsLogin(true); // 로그인 상태 true
      closeModal(false); // 모달 창 닫기

      // JWT 토큰 디코딩, 로그인한 유저 정보 저장
      const decodedToken = jwtDecode(token);
      setLoginedUser(decodedToken);
      console.log(decodedToken);
    } catch (error) {
      console.error("로그인 실패! : ", error);
    }
  };

  // 회원가입 버튼 클릭시 처리
  const handleSignup = async () => {
    try {
      const signupData = {
        id: signupId,
        pw: signupPassword,
        name: signupName,
        email: signupEmail,
      };

      const response = await axios.post("http://localhost/api/user", signupData);
      console.log("회원가입 유저 정보", response);
      setAction("login");
    } catch (error) {
      console.log("회원가입 실패! : ", error);
    }
  };

  useEffect(() => {
    if (loginedUser && loginedUser.role === "admin") {
      navigate("/admin", { state: admin });
    }
  }, [admin, loginedUser, navigate]);

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button className="close-btn" onClick={() => closeModal(false)}>
          X
        </button>
        <div className="header">
          <div className="text">
            여행<span>의</span>민족
          </div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "login" ? (
            // 로그인 input
            <>
              <div className="input">
                <img src={userIcon} alt="유저 아이디 아이콘" />
                <input onChange={handleUserId} value={userId} type="text" placeholder="아이디" />
              </div>
              <div className="input">
                <img src={passwordIcon} alt="비밀번호 아이콘" />
                <input onChange={handleUserPassword} value={userPassword} type="password" placeholder="비밀번호" />
              </div>
            </>
          ) : (
            // 회원가입 input
            <>
              <div className="input">
                <img src={userIcon} alt="유저 이름" />
                <input onChange={handleSignupName} value={signupName} type="text" placeholder="이름" />
              </div>
              <div className="input">
                <img src={userIcon} alt="유저 아이디 아이콘" />
                <input onChange={handleSignupId} value={signupId} type="text" placeholder="아이디" />
              </div>
              <div className="input">
                <img src={passwordIcon} alt="비밀번호 아이콘" />
                <input onChange={handleSignupPassword} value={signupPassword} type="password" placeholder="비밀번호" />
              </div>
              <div className="input">
                <img src={emailIcon} alt="이메일 아이콘" />
                <input onChange={handleSignupEmail} value={signupEmail} type="email" placeholder="이메일" />
              </div>
            </>
          )}
        </div>
        <div className="submit-container">
          <div
            className={action === "login" ? "submit gray" : "submit"} // 버튼 색상 전환
            onClick={() => {
              action === "signup" && handleSignup(); // action이 회원가입일 때만 버튼이 눌림
              setAction("signup");
            }}
          >
            회원가입
          </div>
          <div
            className={action === "login" ? "submit" : "submit gray"} // 버튼 색상 전환
            onClick={() => {
              action === "login" && handleLogin(); // action이 로그인일 때만 버튼이 눌림
              setAction("login");
            }}
          >
            로그인
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
