import { Select, Button } from "antd";
import { SwapRightOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { recommandModalState } from "../../../../../atoms/landing";
import { regionModalState } from "../../../../../atoms/landing";
import { keywordModalState } from "../../../../../atoms/landing";
import { regionInputState } from "../../../../../atoms/userInputData";
import { curCenterState } from "../../../../../atoms/map";
import AnimatedPage from "../../../../../animations/AnimatedPage";
import { pickedPlacesState } from "../../../../../atoms/pickedPlaceList";
import Loading from "../../../../../Loading";

const { Option } = Select;

const SelectRegion = () => {
  const [regionList, setRegionList] = useState([]); // 받아올 지역 정보
  const [selectedKey, setSelectedKey] = useState();
  const setIsRegionModalOpen = useSetRecoilState(regionModalState);
  const setIsKeywordModalOpen = useSetRecoilState(keywordModalState);
  const setIsRecommandModalOpen = useSetRecoilState(recommandModalState);
  const setCenter = useSetRecoilState(curCenterState);
  const setPickedPlaces = useSetRecoilState(pickedPlacesState);
  const [regionData, setRegionData] = useRecoilState(regionInputState);
  const [loading, setLoading] = useState(true);

  const handleKeywordModal = () => {
    setIsKeywordModalOpen(true);
    setIsRegionModalOpen(false);
    setIsRecommandModalOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // api 호출 전 로딩화면 띄우기
      try {
        const response = await axios.get("http://localhost/api/cities");
        setRegionList(response.data);
        setLoading(false); // api 호출 완료되었을 때는 로딩화면 숨기기
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // 각 도시의 위도, 경도 정보 (인덱스로 접근하기에 0번은 비워둠)
  const regionLatLng = [
    {},
    {
      code: 1,
      latitude: 37.5666103,
      longitude: 126.9783882,
    },
    {
      code: 2,
      latitude: 33.4273366,
      longitude: 126.5758344,
    },
    {
      code: 3,
      latitude: 35.179816,
      longitude: 129.0750223,
    },
    {
      code: 4,
      latitude: 35.8563,
      longitude: 129.2245,
    },
    {
      code: 5,
      latitude: 37.752175,
      longitude: 128.875836,
    },
    {
      code: 6,
      latitude: 34.760425,
      longitude: 127.662313,
    },
    {
      code: 7,
      latitude: 36.3504396,
      longitude: 127.3849508,
    },
    {
      code: 8,
      latitude: 37.831508,
      longitude: 127.509541,
    },
  ];

  // 유저가 선택한 지역이 바뀐다면 pickedPlaces 초기화
  useEffect(() => {
    setPickedPlaces(() => new Set());
    console.log("pickedPlaces 초기화");
  }, [regionData, setPickedPlaces]);

  const handleChange = (obj) => {
    console.log(obj);
    const selected = regionList.find((el) => el.code === Number(obj));
    console.log(selected);
    setRegionData({ code: selected.code, name: selected.name });
    const selectedRegion = regionLatLng[selected.code];
    setCenter([selectedRegion.latitude, selectedRegion.longitude]);
  };
  return (
    <AnimatedPage>
      {loading ? <Loading /> : null}
      {regionList ? (
        <div className="select-region">
          <Select
            defaultValue={"어디로 여행을 떠나볼까요?"}
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
                transition: "background-color 0.6s ease",
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
