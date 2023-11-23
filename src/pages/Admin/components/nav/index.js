import "./index.css";
const Nav = () => {
  const handleClickMain = () => {
    window.location.href = "/";
  };

  return (
    <header>
      <div className="admin-nav">
        <ul className="admin-nav-menu">
          <li className="admin-logo">forAdmin</li>
          <li>명소 검색</li>
          <li>명소 등록</li>
          <li>명소 수정</li>
          <li>명소 삭제</li>
        </ul>
      </div>
      <button onClick={handleClickMain} className="go-main-btn">
        메인 페이지로
      </button>
    </header>
  );
};

export default Nav;
