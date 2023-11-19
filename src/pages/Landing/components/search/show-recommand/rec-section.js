import { useState, useEffect } from "react";
import axios from "axios";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { regionModalState } from "../../../../../atoms/landing";
import { keywordModalState } from "../../../../../atoms/landing";
import { recommandModalState } from "../../../../../atoms/landing";

import { regionInputState } from "../../../../../atoms/userInputData";
import { keywordInputState } from "../../../../../atoms/userInputData";
import { recommandListState } from "../../../../../atoms/recommandData";
import { pickedPlacesState } from "../../../../../atoms/pickedPlaceList";

import { Link } from "react-router-dom";
import { Button, FloatButton, Modal, Carousel, Alert } from "antd";

// css 및 효과
import "../index.css";

import AnimatedPage from "../../../../../animations/AnimatedPage";
// import Swiper core and required modules
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Recommand = () => {
  const setIsRegionModalOpen = useSetRecoilState(regionModalState);
  const setIsKeywordModalOpen = useSetRecoilState(keywordModalState);
  const setIsRecommandModalOpen = useSetRecoilState(recommandModalState);

  // 서버로부터 받아올 추천 여행지 목록을 넣어줄 리스트 recoilState
  const [recommandList, setRecommandList] = useRecoilState(recommandListState);

  const [pickedPlaces, setPickedPlaces] = useRecoilState(pickedPlacesState); // 사용가 PICK한 추천 여행지 리스트

  const handleKeywordModal = () => {
    setIsKeywordModalOpen(true);
    setIsRegionModalOpen(false);
    setIsRecommandModalOpen(false);
  };

  const regionValue = useRecoilValue(regionInputState); // 사용자가 선택한 지역 정보
  const keywordValue = useRecoilValue(keywordInputState); // 사용자가 선택한 키워드 Set
  const column = 5; // 받아올 추천 장소의 개수

  const [open, setOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [pickedPlace, setPickedPlace] = useState({});

  const keywordArr = Array.from(keywordValue); // 선택한 keyword를 서버로 넘기기 위해 keyword Set을 배열로 변환
  console.log(keywordArr);
  // keywordCodes 쿼리 생성
  const keywordQueryString = keywordArr
    .map((keyword) => `keywordCodes=${encodeURIComponent(keyword.code)}`)
    .join("&");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost/api/keyword/attractions?cityCode=${regionValue.code}&${keywordQueryString}&column=${column}`
        );
        setRecommandList(response.data); // 받아온 데이터로 추천 리스트 업데이트
      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다.", error);
      }
    };
    fetchData();
  }, []);

  // 받아온 추천 장소 리스트 확인용
  useEffect(() => {
    console.log(recommandList);
  }, [recommandList]);

  const handleClickPlace = (curPlace) => {
    console.log(curPlace);
    setPickedPlace(curPlace); // 슬라이드에서 클릭한 지역의 정보를 curPlace에 set 해주기
    setOpen(true); // 모달창 열기
  };

  useEffect(() => {
    console.log(pickedPlaces);
  }, [pickedPlaces]);

  // 사용자가 PICK 을 누르면
  const handlePick = (pickedPlace) => {
    setOpen(false); // 모달창 닫기
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 1500);
    setPickedPlaces((prev) => new Set([...prev, pickedPlace])); // pickedPlaces (Set 자료구조)에 해당 여행지 넣기
  };

  return (
    <div className="wrap">
      <AnimatedPage>
        <div className="recommand-wrapper">
          <div className="recommand-title"></div>
          <div className="container">
            <Swiper
              // effect={"coverflow"}
              grabCursor={false}
              centeredSlides={false}
              loop={true}
              slidesPerView={3}
              slidesPerGroup={2}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              pagination={{ el: ".swiper-pagination", clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
                clickable: true,
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="swiper_container"
            >
              {recommandList.map((v) => (
                <SwiperSlide
                  key={v.id}
                  onClick={() => handleClickPlace(v)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="img-wrapper">
                    <img src={v.mainImagePath} alt="추천 여행지 사진" />
                    <div className="img-info-section">
                      <p className="title">{v.title}</p>
                      <p className="address">{v.address}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              <div className="slider-controller">
                <div className="swiper-button-prev slider-arrow">
                  <ion-icon name="arrow-back-outline"></ion-icon>
                </div>
                <div className="swiper-button-next slider-arrow">
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </Swiper>
          </div>
          {/* 모달 창 */}
          <Modal
            title={
              <>
                <div style={{ fontSize: "0.9rem", color: "dodgerblue" }}>
                  <p>{pickedPlace.address}</p>
                </div>
                <div style={{ fontSize: "2rem" }}>{pickedPlace.title}</div>
              </>
            }
            centered
            open={open}
            onOk={() => handlePick(pickedPlace)}
            onCancel={() => setOpen(false)}
            width={1000}
            okText="PICK"
            cancelText="닫기"
            bodyStyle={{ height: "100%" }}
          >
            <div
              style={{
                fontSize: "1rem",
                paddingBottom: "3rem",
              }}
            >
              <p>{pickedPlace.overview}</p>
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
                  src={pickedPlace.mainImagePath}
                  alt="모달 명소 이미지"
                />
              </div>
            </Carousel>
          </Modal>
        </div>
      </AnimatedPage>
      {isAlert && (
        <Alert
          showIcon
          message="내가 PICK한 여행지에 추가되었습니다."
          type="info"
          onClose={() => setIsAlert(false)}
          style={{
            transition: "opacity 0.5s",
            position: "absolute",
            width: 300,
            top: "-20%",
            left: "41%",
            textAlign: "center",
          }}
        />
      )}
      <div className="go-more-section">
        <Button type="dashed" onClick={handleKeywordModal}>
          키워드를 다시 고를래요
        </Button>
        <Link to="more" spy={true} smooth={true} duration={500}>
          <Button type="dashed">여행 계획을 세울래요</Button>
        </Link>
        <FloatButton
          description="HELP"
          style={{
            top: 35,
            width: 45,
            height: 45,
            right: 65,
          }}
          tooltip={
            <div>
              <p>
                여행지를 클릭한 후, PICK 버튼을 눌러 즐겨찾기를 설정할 수
                있어요.
              </p>
              <br />
              <p>
                '마이페이지 &gt; 내가 PICK한 여행지'에서 확인하실 수 있어요.
              </p>
              <br />
              <p>
                '다른 여행지도 볼래요' 버튼을 누르면 지역 내의 다른 여행지들도
                보실 수 있어요!
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Recommand;
