import "./index.css";
import KakaoMap from "./components/kakaomaps/Kakaomap";
import SelectMoreRegion from "./components/select-section";
const More = () => {
  return (
    <div id="wrapper">
      <div id="nav">
        여행<span>의</span>민족
      </div>
      <div id="left-section">
        <div className="select-section">
          <SelectMoreRegion />
        </div>
        <div className="picked-section"></div>
      </div>
      <div id="right-section">
        <KakaoMap />
      </div>
    </div>
  );
};

export default More;
