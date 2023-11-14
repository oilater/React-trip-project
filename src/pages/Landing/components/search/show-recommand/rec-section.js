import { Button, Carousel } from "antd";
import { useSetRecoilState } from "recoil";
import { regionModalState } from "../../../../../atoms/landing";
import { keywordModalState } from "../../../../../atoms/landing";
import { recommandModalState } from "../../../../../atoms/landing";
import AnimatedPage from "../../../../../animations/AnimatedPage";
import "../index.css";
import { Link } from "react-scroll";

const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Recommand = () => {
  const setIsRegionModalOpen = useSetRecoilState(regionModalState);
  const setIsKeywordModalOpen = useSetRecoilState(keywordModalState);
  const setIsRecommandModalOpen = useSetRecoilState(recommandModalState);

  const handleKeywordModal = () => {
    setIsKeywordModalOpen(true);
    setIsRegionModalOpen(false);
    setIsRecommandModalOpen(false);
  };

  return (
    <>
      <AnimatedPage>
        <div className="recommand-wrapper">
          <div className="recommand-title"></div>
          <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
            <div>
              <h3 style={contentStyle}>5</h3>
            </div>
          </Carousel>
        </div>
      </AnimatedPage>
      <div className="go-more-section">
        <Button type="dashed" onClick={handleKeywordModal}>
          키워드 다시 고르기
        </Button>
        <Link to="more" spy={true} smooth={true} duration={500}>
          <Button type="dashed">더 많은 여행지를 볼래요</Button>
        </Link>
      </div>
    </>
  );
};

export default Recommand;
