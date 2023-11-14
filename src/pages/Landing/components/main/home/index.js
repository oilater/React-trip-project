import "../styles/main.css";
import tripVideo from "../../../../../assets/video/ProjectMainVideo-1.mp4";
import Nav from "../nav/nav";
import Intro from "./intro-text";
import ScrollImg from "./scroll-down-img";
import GoSearchBtn from "./go-search-btn";

const Main = () => {
  return (
    <>
      <video className="bg-video" src={tripVideo} autoPlay loop muted />
      <div id="main">
        <Nav />
        <Intro />
        <div className="go-search">
          <GoSearchBtn name="여행 떠나기" to="search" />
          <GoSearchBtn name="메인 페이지로" to="sub" />
        </div>
        <ScrollImg />
      </div>
    </>
  );
};

export default Main;
