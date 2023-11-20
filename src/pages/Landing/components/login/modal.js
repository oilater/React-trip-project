import "./modal.css";
import userIcon from "../../../../assets/img/person.png";
import passwordIcon from "../../../../assets/img/password.png";
import emailIcon from "../../../../assets/img/email.png";
import { useState } from "react";
const Modal = ({ closeModal }) => {
  const [action, setAction] = useState("로그인");

  return (
    <div className="modal-background">
      <div className="container">
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
          {action === "로그인" ? (
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
            <input type="text" placeholder="아이디" />
          </div>
          <div className="input">
            <img src={passwordIcon} alt="비밀번호 아이콘" />
            <input type="password" placeholder="비밀번호" />
          </div>
        </div>
        <div className="submit-container">
          <div
            className={action === "로그인" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("회원가입");
            }}
          >
            회원가입
          </div>
          <div
            className={action === "회원가입" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("로그인");
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
