import { AutoComplete, Button, FloatButton, Tag } from "antd";
import { SwapLeftOutlined, SwapRightOutlined } from "@ant-design/icons";
import { useRecoilState, useSetRecoilState } from "recoil";
import { recommandModalState } from "../../../../../atoms/landing";
import { regionModalState } from "../../../../../atoms/landing";
import { keywordModalState } from "../../../../../atoms/landing";
import AnimatedPage from "../../../../../animations/AnimatedPage";
// 키워드 recoil import
import { keywordInputState } from "../../../../../atoms/userInputData";

const options = [
  {
    value: "밤바다",
  },
  {
    value: "별",
  },
  {
    value: "카페",
  },
  {
    value: "가족",
  },
];

const SelectKeyword = () => {
  const setIsRegionModalOpen = useSetRecoilState(regionModalState);
  const setIsKeywordModalOpen = useSetRecoilState(keywordModalState);
  const setIsRecommandModalOpen = useSetRecoilState(recommandModalState);

  const [userKeyword, setUserKeyword] = useRecoilState(keywordInputState); // keyword recoil state

  // 사용자가 입력할 때마다 키워드 값을 세팅
  // userKeyword default 값은 new Set() -> 키워드 중복 방지
  // 선택을 완료했다면 화면 상의 value 값 초기화 하기
  const handleUserSelect = (val) => {
    setUserKeyword((prev) => new Set([...prev, val]));
    console.log(val);
  };

  // keyword onClick 시 삭제
  const handleDeleteKeyword = (e) => {
    setUserKeyword((prev) => {
      prev.delete(e.target.textContent);
      return new Set(prev);
    });
  };

  const handleRegionModal = () => {
    setIsRegionModalOpen(true);
    setIsKeywordModalOpen(false);
    setIsRecommandModalOpen(false);
  };

  const handleRecommandModal = () => {
    setIsRecommandModalOpen(true);
    setIsRegionModalOpen(false);
    setIsKeywordModalOpen(false);
  };

  return (
    <AnimatedPage>
      <div className="select-region">
        <div className="selected-region">
          {Array.from(userKeyword).map((el) => (
            <Tag
              style={{ cursor: "pointer" }}
              key={el}
              bordered={false}
              color={
                el === "별"
                  ? "processing"
                  : el === "밤바다"
                  ? "success"
                  : el === "카페"
                  ? "error"
                  : "warning"
              }
              onClick={handleDeleteKeyword}
            >
              {el}
            </Tag>
          ))}
          {/* 
          <Tag bordered={false} color="success">
            별
          </Tag>
          <Tag bordered={false} color="error">
            카페
          </Tag>
          <Tag bordered={false} color="warning">
            가족여행
          </Tag> */}
        </div>
        <div className="search-bar-section">
          <AutoComplete
            style={{
              width: 600,
              height: 40,
              textAlign: "center",
            }}
            options={options}
            placeholder="여행 키워드를 입력해주세요"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onSelect={handleUserSelect}
          />
        </div>
        <div className="select-keyword-btn-div">
          <div className="keyword-btn-div">
            <Button
              style={{
                width: 50,
                height: 50,
                backgroundColor: "dodgerblue",
              }}
              type="primary"
              shape="circle"
              icon={<SwapLeftOutlined />}
              onClick={handleRegionModal}
            />
            <Button
              style={{
                width: 50,
                height: 50,
                backgroundColor: "dodgerblue",
              }}
              type="primary"
              shape="circle"
              icon={<SwapRightOutlined />}
              onClick={handleRecommandModal}
            />
          </div>
        </div>
        <FloatButton
          tooltip={
            <div className="hot-keyword-description">
              <p>바다</p>
              <p>별</p>
              <p>카페</p>
              <p>버스킹</p>
            </div>
          }
        />
        ;
      </div>
    </AnimatedPage>
  );
};

export default SelectKeyword;
