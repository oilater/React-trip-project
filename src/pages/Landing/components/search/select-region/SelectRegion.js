import { Select, Button } from "antd";
import { SwapRightOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import { useSetRecoilState } from "recoil";
import { recommandModalState } from "../../../../../atoms/landing";
import { regionModalState } from "../../../../../atoms/landing";
import { keywordModalState } from "../../../../../atoms/landing";
import { regionInputState } from "../../../../../atoms/userInputData";
import AnimatedPage from "../../../../../animations/AnimatedPage";
const { Option } = Select;

const SelectRegion = () => {
  const [regionList, setRegionList] = useState([]);
  const [selectedKey, setSelectedKey] = useState();
  const setIsRegionModalOpen = useSetRecoilState(regionModalState);
  const setIsKeywordModalOpen = useSetRecoilState(keywordModalState);
  const setIsRecommandModalOpen = useSetRecoilState(recommandModalState);

  const setRegionData = useSetRecoilState(regionInputState);

  const handleKeywordModal = () => {
    setIsKeywordModalOpen(true);
    setIsRegionModalOpen(false);
    setIsRecommandModalOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Axios를 사용하여 데이터를 가져옵니다.
        const response = await axios.get("https://api.example.com/data");
        // 가져온 데이터를 state에 저장합니다.
        setRegionList(response.data);
      } catch (error) {
        const response = [
          {
            key: "01",
            value: "서울",
          },
          {
            key: "02",
            value: "대전",
          },
          {
            key: "03",
            value: "부산",
          },
        ];

        console.error("Error fetching data:", error);
        setRegionList(response);
      }
    };

    // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
    fetchData();
  }, []);

  const handleChange = (obj) => {
    const selected = regionList.find((item) => item.value === obj);
    // console.log(`selected ${obj.key} ${obj.value}`);
    setRegionData({ key: selected.key, value: selected.value });
  };
  return (
    <AnimatedPage>
      {regionList ? (
        <div className="select-region">
          <Select
            defaultValue={"어디를 여행 하고 싶으신가요?"}
            style={{
              width: 600,
              height: 40,
              textAlign: "center",
            }}
            onChange={handleChange}
            value={selectedKey}
          >
            {regionList.map(({ key, value }) => (
              <Option key={key} value={value}>
                {value}
              </Option>
            ))}
          </Select>
          <div className="next-btn-div">
            <Button
              style={{
                width: 50,
                height: 50,
                backgroundColor: "dodgerblue",
              }}
              type="primary"
              shape="circle"
              icon={<SwapRightOutlined />}
              onClick={handleKeywordModal}
            />
          </div>
        </div>
      ) : null}
    </AnimatedPage>
  );
};

export default SelectRegion;
