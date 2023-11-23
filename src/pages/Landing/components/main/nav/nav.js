import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../../../../../atoms/login";
import { loginedUserState } from "../../../../../atoms/login";

import SnsLink from "./sns-img";
import Modal from "../../login/modal";
import { Dropdown } from "antd";

const Nav = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const loginedUser = useRecoilValue(loginedUserState);

  const handleLogout = () => {
    setIsLogin(false);
  };

  const items = [
    {
      key: "1",
      label: <p>{loginedUser.id}님 환영해요 :)</p>,
    },
    {
      key: "2",
      label: <a href="/mypage">마이페이지</a>,
    },
    {
      key: "3",
      label: (
        <a href="/" onClick={handleLogout}>
          로그아웃
        </a>
      ),
    },
  ];
  return (
    <nav>
      <div className="nav-title">
        <p>
          여행<span className="title-span">의</span>민족
        </p>
      </div>
      <div className="nav-sns">
        <ul className="sns-icon-links">
          <SnsLink url="https://www.baemin.com/_next/static/media/iconFacebook.381c8e36.png" alt="페이스북 바로가기" />
          <SnsLink
            url="https://www.baemin.com/_next/static/media/iconInstagram.59132ce6.png"
            alt="인스타그램 바로가기"
          />
          <SnsLink url="https://www.baemin.com/_next/static/media/iconBlog.185b2ac8.png" alt="블로그 바로가기" />
          <SnsLink url="https://www.baemin.com/_next/static/media/iconYoutube.8ab1feea.png" alt="유튜브 바로가기" />

          {!isLogin ? (
            <button
              className="login-btn"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              로그인
            </button>
          ) : (
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
            >
              <button className="login-btn">MY</button>
            </Dropdown>
          )}
        </ul>
        {openModal && <Modal closeModal={setOpenModal} />}
      </div>
    </nav>
  );
};

export default Nav;
