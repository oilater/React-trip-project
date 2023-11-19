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
  const handleUserSelect = (value, option) => {
    // setUserKeyword((prev) => new Set([...prev, keyword]));
    setUserKeyword((prev) => new Set([...prev, option]));
  };

  // keyword onClick 시 삭제
  const handleDeleteKeyword = (code) => {
    setUserKeyword((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.forEach((el) => {
        if (el.code === code) {
          updatedSet.delete(el);
        }
      });
      return updatedSet;
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
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  // // 확인용
  // useEffect(() => {
  //   console.log(allKeywords);
  // }, [allKeywords]);

  // useEffect(() => {
  //   Array.from(userKeyword).forEach((v) => console.log(v));
  // }, [userKeyword]);

  return (
    <AnimatedPage>
      <div className="select-region">
        <div className="selected-region">
          {Array.from(userKeyword).map((el) => (
            <Tag
              style={{ cursor: "pointer" }}
              key={el.code}
              bordered={false}
              color={
                el.value === "산" || el.value === "절" || el.value === "고적지"
                  ? "processing"
                  : el.value === "별" ||
                    el.value === "공원" ||
                    el.value === "도시"
                  ? "success"
                  : el.value === "계곡" ||
                    el.value === "해수욕장" ||
                    el.value === "연못" ||
                    el.value === "섬"
                  ? "error"
                  : "warning"
              }
              onClick={() => handleDeleteKeyword(el.code)}
            >
              {el.value}
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
            placeholder="어떤 여행을 떠나고 싶나요?"
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
          description="HELP"
          tooltip={
            <div>
              <h3>이번 주 인기 키워드</h3>
              <br />
              {allKeywords.map((v) => (
                <span>{v.keyword} </span>
              ))}
            </div>
          }
          style={{ top: 35, width: 45, height: 45, right: 65 }}
        />
      </div>
    </AnimatedPage>
  );
};

export default SelectKeyword;
