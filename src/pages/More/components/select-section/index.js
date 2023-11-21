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
import { loginTokenState } from "../../../../atoms/login";
import { Tabs, Input, Card, Button, Modal, Carousel, Table } from "antd";
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

// const onSearch = (value, _e, info) => console.log(info?.source, value);

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
  const [searchValue, setSearchValue] = useState(""); // 유저가 검색창에 입력한 값
  // 무한 스크롤
  const [attractionsData, setAttractionsData] = useState([]);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [accomodationsData, setAccomodationsData] = useState([]);
  const [attractionPage, setAttractionPage] = useState(0);
  const [restaurantPage, setRestaurantPage] = useState(0);
  const [accomodationPage, setAccomodationPage] = useState(0);

  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);

  const setCurLevel = useSetRecoilState(curLevelState);
  const setCurCenter = useSetRecoilState(curCenterState);

  // 내가 픽한 명소, 식당, 숙소 리스트 (마이페이지)
  const [myAttrationList, setMyAttractionList] = useRecoilState(
    myAttractionListState
  );
  const [myRestaurantList, setMyRestaurantList] = useRecoilState(
    myRestaurantListState
  );
  const [myAccomodationList, setMyAccomodationList] = useRecoilState(
    myAccomodationListState
  );

  // 유저 로그인 토큰
  const loginToken = useRecoilValue(loginTokenState);

  // 이전에 추천 슬라이드에서 유저가 Pick 했던 것 : Set -> 배열 변환
  const pickedPlacesArr = Array.from(pickedPlaces);

  // 명소 : 데이터 로딩 및 데이터 추가
  const loadAttractionsData = async () => {
    try {
      const responseAttraction = await axios.get(
        `http://localhost/api/map/attractions?&type=1&page=${attractionPage}&cityCode=${curRegion.code}`
      );

      setAttractionPage((prev) => prev + 1); // 페이지 증가

      console.log("responseAttraction :::", responseAttraction);

      const filteredAttractionList = responseAttraction.data.filter((el) => {
        for (let i = 0; i < pickedPlacesArr.length; i++) {
          if (el.title === pickedPlacesArr[i].title) return false;
        }
        return true;
      });

      return filteredAttractionList;
    } catch (error) {
      console.error("명소 : 다음 페이지 장소 불러오기 error", error);
    }
  };
  /////
  useEffect(() => {
    console.log("페이지:", attractionPage);
  }, [attractionPage]);
  // 식당 : 추가 데이터 로딩 및 데이터 추가
  const loadRestaurantsData = async () => {
    try {
      const responseRestaurant = await axios.get(
        `http://localhost/api/map/attractions?&type=2&page=${restaurantPage}&cityCode=${curRegion.code}`
      );

      return responseRestaurant.data;
    } catch (error) {
      console.error("식당 : 다음 페이지 장소 불러오기 error", error);
    }
  };

  // 숙소 : 추가 데이터 로딩 및 데이터 추가
  const loadAccomodationsData = async () => {
    try {
      const responseAccomodation = await axios.get(
        `http://localhost/api/map/attractions?&type=3&page=${accomodationPage}&cityCode=${curRegion.code}`
      );

      return responseAccomodation.data;
    } catch (error) {
      console.error("숙소 : 다음 페이지 장소 불러오기 error", error);
      return [];
    }
  };

  // 초기 데이터 로딩
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attractionsData, restaurantsData, accomodationsData] =
          await Promise.all([
            loadAttractionsData(),
            loadRestaurantsData(),
            loadAccomodationsData(),
          ]);

        // 데이터 처리 로직
        setAttractionsData(attractionsData);
        setRestaurantsData(restaurantsData);
        setAccomodationsData(accomodationsData);
      } catch (error) {
        console.error("데이터 초기 로딩 중 에러", error);
      }
    };

    fetchData();
  }, []);

  // 스크롤 이벤트 처리
  const handleScroll = async (e) => {
    // console.log("이벤트:", e);
    // 스크롤 위치 파악
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    // console.log("현재 스크롤 높이: ", scrollTop + clientHeight);
    // console.log("scrollTop: ", scrollTop);
    // console.log("clientHeight: ", clientHeight);
    // console.log("scrollHeight: ", scrollHeight);
    // 스크롤 위치가 하단에 도달하면 추가 데이터 로딩
    if (scrollTop + clientHeight === scrollHeight) {
      console.log("현재 명소 페이지 번호: ", attractionPage);
      const additionalData = await loadAttractionsData();
      // 추가 데이터 처리 로직
      setAttractionsData((prevData) => [...prevData, ...additionalData]);
    }
  };

  // useEffect(() => {
  //   console.log("지역 내의 여행지 정보들을 받아옵니다", attractionList);
  // }, [attractionList]);

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

  // 명소 : DB에 등록 요청
  const registMyPick = async (myPlace) => {
    try {
      const myPlaceData = {
        attractionId: myPlace.id,
      };
      //토큰담기
      const response = await axios.post(
        "http://localhost/api/interest/",
        myPlaceData,
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
          body: myPlaceData,
        }
      );
      console.log(response);
    } catch (error) {
      console.error("찜 등록 요청 에러 ", error);
    }
  };

  const deleteMyPick = async (myPlace) => {
    try {
      const response = await axios.delete(
        `http://localhost/api/interest/${myPlace.id}`,
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("찜 해제 요청 에러 ", error);
    }
  };

  // 명소 하트 클릭 시
  const handleClickMyAttraction = (myPlace) => {
    if ([...myAttrationList].includes(myPlace)) {
      const filteredAttractionList = [...myAttrationList].filter(
        (v) => v !== myPlace
      );
      setMyAttractionList(new Set(filteredAttractionList));
      // DB에 명소 해제 요청
      deleteMyPick(myPlace);
    } else {
      setMyAttractionList((prev) => new Set([...prev, myPlace]));
      // DB에 내 PICK 등록 요청
      registMyPick(myPlace);
    }
  };

  // 식당 하트 클릭 시
  const handleClickMyRestaurant = (myPlace) => {
    if ([...myRestaurantList].includes(myPlace)) {
      const filteredRestaurantList = [...myRestaurantList].filter(
        (v) => v !== myPlace
      );
      setMyRestaurantList(new Set(filteredRestaurantList));
      // DB에 명소 해제 요청
      deleteMyPick(myPlace);
    } else {
      setMyRestaurantList((prev) => new Set([...prev, myPlace]));
      // DB에 내 PICK 등록 요청
      registMyPick(myPlace);
    }
  };

  // 숙소 하트 클릭 시
  const handleClickMyAccomodation = (myPlace) => {
    if ([...myAccomodationList].includes(myPlace)) {
      const filteredAccomodationList = [...myAccomodationList].filter(
        (v) => v !== myPlace
      );
      setMyAccomodationList(new Set(filteredAccomodationList));
      // DB에 명소 해제 요청
      deleteMyPick(myPlace);
    } else {
      setMyAccomodationList((prev) => new Set([...prev, myPlace]));
      // DB에 내 PICK 등록 요청
      registMyPick(myPlace);
    }
  };

  useEffect(() => {
    console.log("광광지 상세 보기 실행", detailInfo);
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
                    // [...myAttrationList].find((item) => item.id === el.id) ||
                    el.interest ? <HeartFilled /> : <HeartOutlined />
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
        attractionsData.map((el) => (
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
                    // [...myAttrationList].find((item) => item.id === el.id) ||
                    el.interest ? <HeartFilled /> : <HeartOutlined />
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
      children: restaurantsData.map((el) => (
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
      children: accomodationsData.map((el) => (
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
            // onSearch={onSearch}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{
              width: 450,
              paddingBottom: 10,
            }}
          />
        </div>
        <div className="region-tap">
          <Tabs
            id="region-tabs"
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            onScroll={handleScroll}
            size="large"
            tabBarGutter={120}
            tabBarStyle={{ paddingLeft: 40, fontWeight: 600 }}
            style={{
              maxHeight: "49rem",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SelectMoreRegion;
