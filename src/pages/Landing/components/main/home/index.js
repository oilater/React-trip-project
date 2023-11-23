import { useRecoilValue } from "recoil";
import "../styles/main.css";
import tripVideo from "../../../../../assets/video/ProjectMainVideo-1.mp4";
import Nav from "../nav/nav";
import Intro from "./intro-text";
import ScrollImg from "./scroll-down-img";
import GoSearchBtn from "./go-search-btn";
import { loginState } from "../../../../../atoms/login";
const Main = () => {
  const isLogin = useRecoilValue(loginState);

  return (
    <>
      <video className="bg-video" src={tripVideo} autoPlay loop muted />
      <div id="main">
        <Nav />
        <Intro />
        <div className="go-search">
          <GoSearchBtn name="여행 떠나기" to="search" />
          {isLogin && <GoSearchBtn name="내 여행지 보러가기" to="sub" />}
        </div>
        <ScrollImg />
      </div>
    </>
  );
};

export default Main;
