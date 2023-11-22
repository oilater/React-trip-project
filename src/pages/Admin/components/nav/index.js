import "./index.css";
const Nav = () => {
  return (
    <header>
      <div class="admin-nav">
        <ul class="admin-nav-menu">
          <li class="admin-logo">관리자 페이지</li>
          <li>검색</li>
          <li>등록</li>
          <li>수정</li>
          <li>삭제</li>
        </ul>
      </div>
    </header>
  );
};

export default Nav;
