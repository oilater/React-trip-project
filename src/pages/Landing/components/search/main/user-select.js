import { useRecoilValue } from "recoil";
import SelectRegion from "../select-region/SelectRegion";
import SelectKeyword from "../select-keyword/selectKeyword";
import { AnimatePresence } from "framer-motion";
import Recommand from "../show-recommand/rec-section";
import { keywordModalState, recommandModalState, regionModalState } from "../../../../../atoms/landing";

const SelectByUser = () => {
  const isKeywordModalOpen = useRecoilValue(keywordModalState);
  const isRegionModalOpen = useRecoilValue(regionModalState);
  const isRecommandModalOpen = useRecoilValue(recommandModalState);

  const activeStyle = {
    color: "black",
  };

  return (
    <div id="search" className="select-user-wrapper">
      <div className="select-user">
        <div className="go-keyword" style={isRegionModalOpen ? activeStyle : {}}>
          <p>Step 1</p>
          <h3 className="link-title">지역 선택하기</h3>
        </div>
        <div className="go-keyword" style={isKeywordModalOpen ? activeStyle : {}}>
          <p>Step 2</p>
          <h3 className="link-title">키워드 선택하기</h3>
        </div>
        <div className="go-keyword" style={isRecommandModalOpen ? activeStyle : {}}>
          <p>Step 3</p>
          <h3 className="link-title">추천 여행지 고르기</h3>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isRegionModalOpen && <SelectRegion />}
        {isKeywordModalOpen && <SelectKeyword />}
        {isRecommandModalOpen && <Recommand />}
      </AnimatePresence>
    </div>
  );
};

export default SelectByUser;
