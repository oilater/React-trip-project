import { useEffect } from "react";
import axios from "axios";
import { Button } from "antd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { regionModalState } from "../../../../../atoms/landing";
import { keywordModalState } from "../../../../../atoms/landing";
import { recommandModalState } from "../../../../../atoms/landing";
import AnimatedPage from "../../../../../animations/AnimatedPage";
import "../index.css";
import { Link } from "react-router-dom";
import { regionInputState } from "../../../../../atoms/userInputData";
import { keywordInputState } from "../../../../../atoms/userInputData";
import { recommandListState } from "../../../../../atoms/recommandData";

const Recommand = () => {
  const setIsRegionModalOpen = useSetRecoilState(regionModalState);
  const setIsKeywordModalOpen = useSetRecoilState(keywordModalState);
  const setIsRecommandModalOpen = useSetRecoilState(recommandModalState);

  // 서버로부터 받아올 추천 여행지 목록을 넣어줄 리스트 recoilState
  const [recommandList, setRecommandList] = useRecoilState(recommandListState);

  const handleKeywordModal = () => {
    setIsKeywordModalOpen(true);
    setIsRegionModalOpen(false);
    setIsRecommandModalOpen(false);
  };

  const regionValue = useRecoilValue(regionInputState); // 사용자가 선택한 지역 정보
  const keywordValue = useRecoilValue(keywordInputState); // 사용자가 선택한 키워드 Set
  const column = 5; // 받아올 추천 장소의 개수

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost/api/keyword/attractions?cityCode=${regionValue.code}&column=${column}`
        );
        setRecommandList(response.data); // 받아온 데이터로 추천 리스트 업데이트
      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다.", error);
      }
    };
    fetchData();
  }, []);

  // 받아온 추천 장소 리스트 확인용
  useEffect(() => {
    console.log(recommandList);
  }, [recommandList]);

  return (
    <>
      <AnimatedPage>
        <div className="recommand-wrapper">
          <div className="recommand-title"></div>
          <div className="container"></div>
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
