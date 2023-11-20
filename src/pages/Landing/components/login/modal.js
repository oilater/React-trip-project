import "./modal.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import userIcon from "../../../../assets/img/person.png";
import passwordIcon from "../../../../assets/img/password.png";
import emailIcon from "../../../../assets/img/email.png";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "../../../../atoms/login";
import { loginTokenState } from "../../../../atoms/login";

const Modal = ({ closeModal }) => {
  const [action, setAction] = useState("login");
  // 로그인 > 유저 입력 (아이디, 비밀번호)
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [loginToken, setLoginToken] = useRecoilState(loginTokenState);

  const handleUserId = (e) => {
    setUserId(e.target.value);
  };

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const loginData = {
        id: userId,
        pw: userPassword,
      };

      const response = await axios.post(
        "http://localhost/api/user/login",
        loginData
      );

      console.log(response.data.token); // 토큰 키 받아옴
      const token = response.data.token;
      setLoginToken(response.data.token); // 토큰 키 recoil에 세팅
      setIsLogin(true); // 로그인 상태 true로 전환
      closeModal(false); // 모달 창 닫기

      // JWT 토큰 디코딩
      const decodedToken = jwtDecode(token);

      console.log(decodedToken);
    } catch (error) {
      console.error("로그인 실패, ", error);
    }
  };

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
            <></>
          ) : (
            <>
              <div className="input">
                <img src={userIcon} alt="유저 이름" />
                <input type="text" placeholder="이름" />
              </div>
              <div className="input">
                <img src={emailIcon} alt="이메일 아이콘" />
                <input type="password" placeholder="이메일" />
              </div>
            </>
          )}

          <div className="input">
            <img src={userIcon} alt="유저 아이디 아이콘" />
            <input
              onChange={handleUserId}
              value={userId}
              type="text"
              placeholder="아이디"
            />
          </div>
          <div className="input">
            <img src={passwordIcon} alt="비밀번호 아이콘" />
            <input
              onChange={handleUserPassword}
              value={userPassword}
              type="password"
              placeholder="비밀번호"
            />
          </div>
        </div>
        <div className="submit-container">
          <div
            className={action === "login" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("signUp");
            }}
          >
            회원가입
          </div>
          <div
            className={action === "signUp" ? "submit gray" : "submit"}
            onClick={() => {
              action === "login" && handleLogin(); // action이 로그인일 때만 눌리도록 수정하기
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
