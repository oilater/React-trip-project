import { useEffect, useState } from "react";
import axios from "axios";
import { AutoComplete, Button, FloatButton, Tag } from "antd";
import { SwapLeftOutlined, SwapRightOutlined } from "@ant-design/icons";
import { useRecoilState, useSetRecoilState } from "recoil";
import { recommandModalState } from "../../../../../atoms/landing";
import { regionModalState } from "../../../../../atoms/landing";
import { keywordModalState } from "../../../../../atoms/landing";
import AnimatedPage from "../../../../../animations/AnimatedPage";
// 키워드 recoil import
import { keywordInputState } from "../../../../../atoms/userInputData";

const SelectKeyword = () => {
  const setIsRegionModalOpen = useSetRecoilState(regionModalState);
  const setIsKeywordModalOpen = useSetRecoilState(keywordModalState);
  const setIsRecommandModalOpen = useSetRecoilState(recommandModalState);

  const [userKeyword, setUserKeyword] = useRecoilState(keywordInputState); // keyword recoil state

  const [allKeywords, setAllKeywords] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost/api/keywords");
        setAllKeywords(() => response.data); // 받아온 모든 키워드 useState로 저장
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // 확인용
  useEffect(() => {
    console.log(allKeywords);
  }, [allKeywords]);

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
                el === "산" || el === "절" || el === "고적지"
                  ? "processing"
                  : el === "별" || el === "공원" || el === "도시"
                  ? "success"
                  : el === "계곡" ||
                    el === "해수욕장" ||
                    el === "연못" ||
                    el === "섬"
                  ? "error"
                  : "warning"
              }
              onClick={handleDeleteKeyword}
            >
              {el}
            </Tag>
          ))}
        </div>
        <div className="search-bar-section">
          <AutoComplete
            style={{
              width: 600,
              height: 40,
              textAlign: "center",
            }}
            options={allKeywords.map((item) => ({
              value: item.keyword,
              code: item.code,
            }))}
            placeholder="여행 키워드를 입력해주세요"
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
              {allKeywords.map((v) => (
                <p>{v.keyword}</p>
              ))}
            </div>
          }
        />
      </div>
    </AnimatedPage>
  );
};

export default SelectKeyword;
