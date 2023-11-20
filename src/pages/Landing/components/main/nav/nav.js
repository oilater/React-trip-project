import { useState } from "react";
import SnsLink from "./sns-img";
import Modal from "../../login/modal";
import { Button, Dropdown } from "antd";

const Nav = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <nav>
      <div className="nav-title">
        <p>
          여행<span className="title-span">의</span>민족
        </p>
      </div>
      <div className="nav-sns">
        <ul className="sns-icon-links">
          <SnsLink
            url="https://www.baemin.com/_next/static/media/iconFacebook.381c8e36.png"
            alt="페이스북 바로가기"
          />
          <SnsLink
            url="https://www.baemin.com/_next/static/media/iconInstagram.59132ce6.png"
            alt="인스타그램 바로가기"
          />
          <SnsLink
            url="https://www.baemin.com/_next/static/media/iconBlog.185b2ac8.png"
            alt="블로그 바로가기"
          />
          <SnsLink
            url="https://www.baemin.com/_next/static/media/iconYoutube.8ab1feea.png"
            alt="유튜브 바로가기"
          />
          <button
            className="login-btn"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            로그인
          </button>
        </ul>
        {openModal && <Modal closeModal={setOpenModal} />}
      </div>
    </nav>
  );
};

export default Nav;
