import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { placeListState } from "../../../../atoms/placeList";
import { pickedRegionState } from "../../../../atoms/userInputData";
import { pickedPlacesState } from "../../../../atoms/pickedPlaceList";
import { regionInputState } from "../../../../atoms/userInputData";
// 내가 찜한 명소, 식당, 숙소 저장할 곳
import { attractionListState } from "../../../../atoms/recommandData";
import { restaurantListState } from "../../../../atoms/recommandData";
import { accomodationListState } from "../../../../atoms/recommandData";

import { Tabs, Input, Avatar, Card, Button, Modal } from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";

import "./index.css";

const { Search } = Input;
const onChange = (key) => {
  console.log(key);
};

const onSearch = (value, _e, info) => console.log(info?.source, value);
const SelectMoreRegion = () => {
  const [open, setOpen] = useState(false); // 모달창 상태
  const [place, setPlace] = useRecoilState(placeListState);
  const setPickedRegion = useSetRecoilState(pickedRegionState);
  const [pickedPlaces, setPickedPlaces] = useRecoilState(pickedPlacesState); // 추천 받은 여행지 중 유저가 고른 여행지 목록
  const curRegion = useRecoilValue(regionInputState); // 현재 지역 {코드, 지역명}
  const [attractionList, setAttractionList] = useState([]); // 비동기로 받을 현재 지역의 여행지 목록
  const [restaurantList, setRestaurantList] = useState([]); // 비동기로 받을 현재 지역의 음식점 목록
  const [accomodationList, setAccomodationList] = useState([]); // 비동기로 받을 현재 지역의 숙소 목록

  const pickedPlacesArr = Array.from(pickedPlaces); // Set -> 배열 변환

  // axios로 데이터 받아오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAttraction = await axios.get(
          `http://localhost/api/map/attractions?&type=1&page=0&cityCode=${curRegion.code}&exceptId=1`
        );

        const responseRestaurant = await axios.get(
          `http://localhost/api/map/attractions?&type=2&page=0&cityCode=${curRegion.code}&exceptId=1`
        );

        const responseAccomodation = await axios.get(
          `http://localhost/api/map/attractions?&type=3&page=0&cityCode=${curRegion.code}&exceptId=1`
        );

        setAttractionList(responseAttraction.data);
        setRestaurantList(responseRestaurant.data);
        setAccomodationList(responseAccomodation.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("지역 내의 여행지 정보들을 받아옵니다", attractionList);
  }, [attractionList]);

  const moveLocation = (title, address, lat, lng) => {
    console.log(title, address);
    const newLocation = {
      title: title,
      address: address,
      lat: lat,
      lng: lng,
    };
    setPickedRegion((prev) => [...prev, newLocation]);
  };

  const handleSelectPlace = (placeData) => {
    for (const item of place) {
      if (item.id === placeData.id) {
        // 해당 원소가 place에 있다면 placeData를 place에서 제거해줘야 함
        const filteredPlaces = place.filter((v) => v.id !== placeData.id);
        setPlace(filteredPlaces);
        return;
      }
    }
    setPlace((origin) => [...origin, placeData]);
  };

  const items = [
    {
      key: "1",
      label: "관광지",
      children: [
        // 먼저 사용자가 PICK한 여행지들이 상단에 뜨도록 함
        pickedPlacesArr.map((el) => (
          <Card
            className="antd-card"
            key={el.id}
            style={{
              width: 430,
              marginTop: 5,
              cursor: "pointer",
            }}
            onClick={(e) => {
              if (e.target.closest(".add-btn") == null) setOpen(true);
              else setOpen(false);
            }}
          >
            <div className="card">
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              <div className="card-text-wrapper">
                <div id="title" className="card-title">
                  {el.title}
                </div>
                <div id="address" className="card-address">
                  {el.address}
                </div>
              </div>
              <div className="add-btn">
                <Button
                  type="primary"
                  icon={
                    place.find((item) => item.id === el.id) ? (
                      <CheckOutlined />
                    ) : (
                      <PlusOutlined />
                    )
                  }
                  size="small"
                  style={
                    place.find((item) => item.id === el.id)
                      ? { backgroundColor: "dodgerblue" }
                      : { backgroundColor: "#E0E0E0" }
                  }
                  onClick={() => {
                    handleSelectPlace(el);
                    moveLocation(el.title, el.address, el.lat, el.lng);
                  }}
                />
              </div>
            </div>
          </Card>
        )),
        // 이제 DB에서 넘어온 해당 지역 관광지들 정보 리스트화
        attractionList.map((el) => (
          <Card
            className="antd-card"
            key={el.id}
            style={{
              width: 430,
              marginTop: 5,
              cursor: "pointer",
            }}
            onClick={(e) => {
              if (e.target.closest(".add-btn") == null) setOpen(true);
              else setOpen(false);
            }}
          >
            <div className="card">
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              <div className="card-text-wrapper">
                <div id="title" className="card-title">
                  {el.title}
                </div>
                <div id="address" className="card-address">
                  {el.address}
                </div>
              </div>
              <div className="add-btn">
                <Button
                  type="primary"
                  icon={
                    place.find((item) => item.id === el.id) ? (
                      <CheckOutlined />
                    ) : (
                      <PlusOutlined />
                    )
                  }
                  size="small"
                  style={
                    place.find((item) => item.id === el.id)
                      ? { backgroundColor: "dodgerblue" }
                      : { backgroundColor: "#E0E0E0" }
                  }
                  onClick={() => {
                    handleSelectPlace(el);
                    moveLocation(el.title, el.address, el.lat, el.lng);
                  }}
                />
              </div>
            </div>
          </Card>
        )),
      ],
    },
    // 식당 section
    {
      key: "2",
      label: "식당",
      children: restaurantList.map((el) => (
        <Card
          className="antd-card"
          key={el.id}
          style={{
            width: 430,
            marginTop: 5,
            cursor: "pointer",
          }}
          onClick={(e) => {
            if (e.target.closest(".add-btn") == null) setOpen(true);
            else setOpen(false);
          }}
        >
          <div className="card">
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
            <div className="card-text-wrapper">
              <div id="title" className="card-title">
                {el.title}
              </div>
              <div id="address" className="card-address">
                {el.address}
              </div>
            </div>
            <div className="add-btn">
              <Button
                type="primary"
                icon={
                  place.find((item) => item.id === el.id) ? (
                    <CheckOutlined />
                  ) : (
                    <PlusOutlined />
                  )
                }
                size="small"
                style={
                  place.find((item) => item.id === el.id)
                    ? { backgroundColor: "dodgerblue" }
                    : { backgroundColor: "#E0E0E0" }
                }
                onClick={() => {
                  handleSelectPlace(el);
                  moveLocation(el.title, el.address, el.lat, el.lng);
                }}
              />
            </div>
          </div>
        </Card>
      )),
    },
    {
      key: "3",
      label: "숙소",
      children: accomodationList.map((el) => (
        <Card
          className="antd-card"
          key={el.id}
          style={{
            width: 430,
            marginTop: 5,
            cursor: "pointer",
          }}
          onClick={(e) => {
            if (e.target.closest(".add-btn") == null) setOpen(true);
            else setOpen(false);
          }}
        >
          <div className="card">
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
            <div className="card-text-wrapper">
              <div id="title" className="card-title">
                {el.title}
              </div>
              <div id="address" className="card-address">
                {el.address}
              </div>
            </div>
            <div className="add-btn">
              <Button
                type="primary"
                icon={
                  place.find((item) => item.id === el.id) ? (
                    <CheckOutlined />
                  ) : (
                    <PlusOutlined />
                  )
                }
                size="small"
                style={
                  place.find((item) => item.id === el.id)
                    ? { backgroundColor: "dodgerblue" }
                    : { backgroundColor: "#E0E0E0" }
                }
                onClick={() => {
                  handleSelectPlace(el);
                  moveLocation(el.title, el.address, el.lat, el.lng);
                }}
              />
            </div>
          </div>
        </Card>
      )),
    },
  ];

  return (
    <>
      {/* 모달창 */}
      <Modal
        title="서울숲"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        bodyStyle={{ height: "600px", overflowY: "auto" }}
      >
        <p>서울 숲은 공기가 좋아요 놀러오삼</p>
      </Modal>
      {/* 메인 화면 */}
      <div className="select-region-wrapper">
        <div className="region-title">{curRegion.name}</div>
        <div className="region-search-bar">
          <Search
            placeholder="장소명을 입력하세요"
            onSearch={onSearch}
            style={{
              width: 430,
              paddingBottom: 10,
            }}
          />
        </div>
        <div className="region-tap">
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            size="large"
            tabBarGutter={100}
            tabBarStyle={{ paddingLeft: 50, fontWeight: 600 }}
          />
        </div>
      </div>
    </>
  );
};

export default SelectMoreRegion;
