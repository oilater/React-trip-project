import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { curCenterState } from "../../../../atoms/map";
import { curLevelState } from "../../../../atoms/map";
import { pickedRegionState } from "../../../../atoms/userInputData";
import { pickedPlacesState } from "../../../../atoms/pickedPlaceList";
import { regionInputState } from "../../../../atoms/userInputData";
// 내가 찜한 명소, 식당, 숙소 저장할 곳
import { myAttractionListState } from "../../../../atoms/myPick";
import { myRestaurantListState } from "../../../../atoms/myPick";
import { myAccomodationListState } from "../../../../atoms/myPick";

import { Tabs, Input, Card, Button, Modal, Carousel } from "antd";
import {
  PlusOutlined,
  CheckOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";

import "./index.css";

const { Search } = Input;
const onChange = (key) => {
  console.log(key);
};

// 이전에 슬라이드에서 Pick한 장소는 pickedPlace에 저장되어 있음

const onSearch = (value, _e, info) => console.log(info?.source, value);
const SelectMoreRegion = () => {
  const [open, setOpen] = useState(false); // 모달창 상태
  const [detailInfo, setDetailInfo] = useState({}); // 여행지 클릭 > 상세보기 모달창
  // const [place, setPlace] = useRecoilState(placeListState);
  const [pickedRegion, setPickedRegion] = useRecoilState(pickedRegionState);
  const pickedPlaces = useRecoilValue(pickedPlacesState); // 추천 받은 여행지 중 유저가 고른 여행지 목록
  const curRegion = useRecoilValue(regionInputState); // 현재 지역 {코드, 지역명} - 큰 제목 띄우기 위함
  const [attractionList, setAttractionList] = useState([]); // 비동기로 받을 현재 지역의 여행지 목록
  const [restaurantList, setRestaurantList] = useState([]); // 비동기로 받을 현재 지역의 음식점 목록
  const [accomodationList, setAccomodationList] = useState([]); // 비동기로 받을 현재 지역의 숙소 목록

  const setCurLevel = useSetRecoilState(curLevelState);
  const setCurCenter = useSetRecoilState(curCenterState);

  // 내가 픽한 명소, 식당, 숙소 리스트 (마이페이지에서 사용할 것)
  const [myAttrationList, setMyAttractionList] = useRecoilState(
    myAttractionListState
  );

  const [myRestaurantList, setMyRestaurantList] = useRecoilState(
    myRestaurantListState
  );

  const [myAccomodationList, setMyAccomodationList] = useRecoilState(
    myAccomodationListState
  );

  // 이전에 추천 슬라이드에서 유저가 Pick 했던 것 : Set -> 배열 변환
  const pickedPlacesArr = Array.from(pickedPlaces);

  // axios로 서버에서 데이터 받아오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAttraction = await axios.get(
          `http://localhost/api/map/attractions?&type=1&page=0&cityCode=${curRegion.code}`
        );

        const responseRestaurant = await axios.get(
          `http://localhost/api/map/attractions?&type=2&page=0&cityCode=${curRegion.code}`
        );

        const responseAccomodation = await axios.get(
          `http://localhost/api/map/attractions?&type=3&page=0&cityCode=${curRegion.code}`
        );

        const filteredAttractionList = responseAttraction.data.filter((el) => {
          for (let i = 0; i < pickedPlacesArr.length; i++) {
            if (el.title == pickedPlacesArr[i].title) return false;
          }
          return true;
        });

        setAttractionList(filteredAttractionList);
        setRestaurantList(responseRestaurant.data);
        setAccomodationList(responseAccomodation.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [curRegion.code]);

  useEffect(() => {
    console.log("지역 내의 여행지 정보들을 받아옵니다", attractionList);
  }, [attractionList]);

  const moveLocation = (title, address, lat, lng) => {
    console.log(title, address, lat, lng);

    if (pickedRegion.find((v) => v.title === title)) {
      setCurCenter([lat, lng]);
      setCurLevel(7);
    } else {
      setCurCenter([lat, lng]);
      setCurLevel(7);
    }
  };

  const handleSelectPlace = (placeData) => {
    const tmpArr = new Set([...pickedRegion, placeData]);
    setPickedRegion(() => Array.from(tmpArr));
    setDetailInfo(placeData);
  };

  const handleModal = (placeData) => {
    setDetailInfo(placeData);
    setOpen(true);
  };

  // 명소 하트 클릭 시
  const handleClickMyAttraction = (myPlace) => {
    if ([...myAttrationList].includes(myPlace)) {
      const filteredAttractionList = [...myAttrationList].filter(
        (v) => v !== myPlace
      );
      setMyAttractionList(new Set(filteredAttractionList));
    } else {
      setMyAttractionList((prev) => new Set([...prev, myPlace]));
    }
  };

  // 명소 하트 클릭 시
  const handleClickMyRestaurant = (myPlace) => {
    if ([...myRestaurantList].includes(myPlace)) {
      const filteredRestaurantList = [...myRestaurantList].filter(
        (v) => v !== myPlace
      );
      setMyRestaurantList(new Set(filteredRestaurantList));
    } else {
      setMyRestaurantList((prev) => new Set([...prev, myPlace]));
    }
  };

  // 명소 하트 클릭 시
  const handleClickMyAccomodation = (myPlace) => {
    if ([...myAccomodationList].includes(myPlace)) {
      const filteredAccomodationList = [...myAccomodationList].filter(
        (v) => v !== myPlace
      );
      setMyAccomodationList(new Set(filteredAccomodationList));
    } else {
      setMyAccomodationList((prev) => new Set([...prev, myPlace]));
    }
  };

  useEffect(() => {
    console.log("디테일 인포임", detailInfo);
  }, [detailInfo]);

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
              width: 450,
              marginTop: 5,
              cursor: "pointer",
            }}
            onClick={(e) => {
              if (e.target.closest(".add-btn") == null) {
                setOpen(true);
                handleModal(el);
              } else {
                setOpen(false);
                // pickedPlaceArr에서도 하트 버튼 눌렀을 때는 내가 선택한 장소 리스트에 추가되면 안된다.
                if (e.target.closest(".heart-btn") == null) {
                  handleSelectPlace(el);
                }
              }
            }}
          >
            <div className="card">
              <img
                style={{ width: "4.5rem", height: "4.5rem", borderRadius: 16 }}
                src={el.mainImagePath}
                alt="카드 장소 이미지"
              />
              <div className="card-text-wrapper">
                <div id="title" className="card-title">
                  {el.title}
                </div>
                <div id="address" className="card-address">
                  {el.address}
                </div>
              </div>
              <div className="add-btn">
                {/* 하트 버튼 */}
                <Button
                  className="heart-btn"
                  type="primary"
                  icon={
                    [...myAttrationList].find((item) => item.id === el.id) ? (
                      <HeartFilled />
                    ) : (
                      <HeartOutlined />
                    )
                  }
                  size="small"
                  style={
                    [...myAttrationList].find((item) => item.id === el.id)
                      ? {
                          backgroundColor: "rgb(255, 88, 88)",
                          marginRight: "0.5rem",
                        }
                      : { backgroundColor: "#E0E0E0", marginRight: "0.5rem" }
                  }
                  onClick={() => {
                    handleClickMyAttraction(el);
                    moveLocation(
                      el.title,
                      el.address,
                      el.latitude,
                      el.longitude
                    );
                  }}
                />
                {/* 플러스 버튼 */}
                <Button
                  type="primary"
                  icon={
                    pickedRegion.find((item) => item.id === el.id) ? (
                      <CheckOutlined />
                    ) : (
                      <PlusOutlined />
                    )
                  }
                  size="small"
                  style={
                    pickedRegion.find((item) => item.id === el.id)
                      ? { backgroundColor: "dodgerblue" }
                      : { backgroundColor: "#E0E0E0" }
                  }
                  onClick={() => {
                    handleSelectPlace(el);
                    moveLocation(
                      el.title,
                      el.address,
                      el.latitude,
                      el.longitude
                    );
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
              width: 450,
              marginTop: 5,
              cursor: "pointer",
            }}
            onClick={(e) => {
              if (e.target.closest(".add-btn") == null) {
                setOpen(true);
                handleModal(el);
              } else setOpen(false);
            }}
          >
            <div className="card">
              <img
                style={{ width: "4.5rem", height: "4.5rem", borderRadius: 15 }}
                src={el.mainImagePath}
                alt="카드 장소 이미지"
              />
              <div className="card-text-wrapper">
                <div id="title" className="card-title">
                  {el.title}
                </div>
                <div id="address" className="card-address">
                  {el.address}
                </div>
              </div>
              <div className="add-btn">
                {/* 하트 버튼 */}
                <Button
                  className="heart-btn"
                  type="primary"
                  icon={
                    [...myAttrationList].find((item) => item.id === el.id) ? (
                      <HeartFilled />
                    ) : (
                      <HeartOutlined />
                    )
                  }
                  size="small"
                  style={
                    [...myAttrationList].find((item) => item.id === el.id)
                      ? {
                          backgroundColor: "rgb(255, 88, 88)",
                          marginRight: "0.5rem",
                        }
                      : { backgroundColor: "#E0E0E0", marginRight: "0.5rem" }
                  }
                  onClick={() => {
                    handleClickMyAttraction(el);
                    moveLocation(
                      el.title,
                      el.address,
                      el.latitude,
                      el.longitude
                    );
                  }}
                />
                {/* 플러스 버튼 */}
                <Button
                  type="primary"
                  icon={
                    pickedRegion.find((item) => item.id === el.id) !== null ? (
                      <CheckOutlined />
                    ) : (
                      <PlusOutlined />
                    )
                  }
                  size="small"
                  style={
                    pickedRegion.find((item) => item.id === el.id)
                      ? { backgroundColor: "dodgerblue" }
                      : { backgroundColor: "#E0E0E0" }
                  }
                  onClick={() => {
                    handleSelectPlace(el);
                    moveLocation(
                      el.title,
                      el.address,
                      el.latitude,
                      el.longitude
                    );
                  }}
                />
              </div>
            </div>
          </Card>
        )),
      ],
    },
    // type 2: 식당 section
    {
      key: "2",
      label: "식당",
      children: restaurantList.map((el) => (
        <Card
          className="antd-card"
          key={el.id}
          style={{
            width: 450,
            marginTop: 5,
            cursor: "pointer",
          }}
          onClick={(e) => {
            if (e.target.closest(".add-btn") == null) {
              setOpen(true);
              handleModal(el);
            } else setOpen(false);
          }}
        >
          <div className="card">
            <img
              style={{ width: "4.5rem", height: "4.5rem", borderRadius: 15 }}
              src={el.mainImagePath}
              alt="카드 장소 이미지"
            />
            <div className="card-text-wrapper">
              <div id="title" className="card-title">
                {el.title}
              </div>
              <div id="address" className="card-address">
                {el.address}
              </div>
            </div>
            <div className="add-btn">
              {/* 하트 버튼 */}
              <Button
                className="heart-btn"
                type="primary"
                icon={
                  [...myRestaurantList].find((item) => item.id === el.id) ? (
                    <HeartFilled />
                  ) : (
                    <HeartOutlined />
                  )
                }
                size="small"
                style={
                  [...myRestaurantList].find((item) => item.id === el.id)
                    ? { backgroundColor: "#FF0000", marginRight: "0.5rem" }
                    : { backgroundColor: "#E0E0E0", marginRight: "0.5rem" }
                }
                onClick={() => {
                  handleClickMyRestaurant(el);
                  moveLocation(el.title, el.address, el.latitude, el.longitude);
                }}
              />
              {/* 플러스 버튼 */}
              <Button
                type="primary"
                icon={
                  pickedRegion.find((item) => item.id === el.id) !== null ? (
                    <CheckOutlined />
                  ) : (
                    <PlusOutlined />
                  )
                }
                size="small"
                style={
                  pickedRegion.find((item) => item.id === el.id)
                    ? { backgroundColor: "dodgerblue" }
                    : { backgroundColor: "#E0E0E0" }
                }
                onClick={() => {
                  handleSelectPlace(el);
                  moveLocation(el.title, el.address, el.latitude, el.longitude);
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
            if (e.target.closest(".add-btn") == null) {
              setOpen(true);
              handleModal(el);
            } else setOpen(false);
          }}
        >
          <div className="card">
            <img
              style={{ width: "4.5rem", height: "4.5rem", borderRadius: 15 }}
              src={el.mainImagePath}
              alt="카드 장소 이미지"
            />
            <div className="card-text-wrapper">
              <div id="title" className="card-title">
                {el.title}
              </div>
              <div id="address" className="card-address">
                {el.address}
              </div>
            </div>
            <div className="add-btn">
              {/* 하트 버튼 */}
              <Button
                className="heart-btn"
                type="primary"
                icon={
                  [...myAccomodationList].find((item) => item.id === el.id) ? (
                    <HeartFilled />
                  ) : (
                    <HeartOutlined />
                  )
                }
                size="small"
                style={
                  [...myAccomodationList].find((item) => item.id === el.id)
                    ? { backgroundColor: "#FF0000", marginRight: "0.5rem" }
                    : { backgroundColor: "#E0E0E0", marginRight: "0.5rem" }
                }
                onClick={() => {
                  handleClickMyAccomodation(el);
                  moveLocation(el.title, el.address, el.latitude, el.longitude);
                }}
              />
              {/* 플러스 버튼 */}
              <Button
                type="primary"
                icon={
                  pickedRegion.find((item) => item.id === el.id) !== null ? (
                    <CheckOutlined />
                  ) : (
                    <PlusOutlined />
                  )
                }
                size="small"
                style={
                  pickedRegion.find((item) => item.id === el.id)
                    ? { backgroundColor: "dodgerblue" }
                    : { backgroundColor: "#E0E0E0" }
                }
                onClick={() => {
                  handleSelectPlace(el);
                  moveLocation(el.title, el.address, el.latitude, el.longitude);
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
      {/* 모달 창 */}
      <Modal
        title={
          <>
            <div style={{ fontSize: "0.9rem", color: "dodgerblue" }}>
              <p>{detailInfo.address}</p>
            </div>
            <div style={{ fontSize: "2rem" }}>{detailInfo.title}</div>
          </>
        }
        centered
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
        width={1000}
        cancelText="닫기"
        bodyStyle={{ height: "100%" }}
      >
        <div
          style={{
            fontSize: "1rem",
            paddingBottom: "3rem",
          }}
        >
          <p>{detailInfo.overview}</p>
        </div>
        <Carousel autoplay>
          <div className="modal-img content-style">
            <img
              style={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
                margin: "0 auto",
                borderRadius: "0.5rem",
              }}
              src={detailInfo.mainImagePath}
              alt="모달 명소 이미지"
            />
          </div>
        </Carousel>
      </Modal>
      {/* 메인 화면 */}
      <div className="select-region-wrapper">
        <div className="region-title">{curRegion.name}</div>
        <div className="region-search-bar">
          <Search
            placeholder="장소명을 입력하세요"
            onSearch={onSearch}
            style={{
              width: 450,
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
            tabBarGutter={120}
            tabBarStyle={{ paddingLeft: 50, fontWeight: 600 }}
          />
        </div>
      </div>
    </>
  );
};

export default SelectMoreRegion;
