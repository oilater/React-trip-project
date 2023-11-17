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
  const [regionList, setRegionList] = useState([]); // 받아올 지역 정보
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
        const response = await axios.get("http://localhost/api/cities");
        setRegionList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function inside the effect
  }, []);
  const handleChange = (obj) => {
    console.log(obj);
    const selected = regionList.find((el) => el.code === Number(obj));
    console.log(selected);
    setRegionData({ code: selected.code, name: selected.name });
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
            value={selectedKey}
            onChange={handleChange}
          >
            {regionList.map(({ code, name }) => (
              <Option key={code} code={code} name={name}>
                {name}
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
