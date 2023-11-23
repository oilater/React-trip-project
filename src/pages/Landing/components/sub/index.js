import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Button, FloatButton, Modal, Carousel } from "antd";
import { useRecoilValue } from "recoil";
import { loginTokenState } from "../../../../atoms/login";
import { loginedUserState } from "../../../../atoms/login";
// import Swiper core and required modules
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../search/index.css";

const SubPage = () => {
  const loginToken = useRecoilValue(loginTokenState);
  const loginedUser = useRecoilValue(loginedUserState);
  const [open, setOpen] = useState(false);
  const [myPlaceList, setMyPlaceList] = useState([]);

  const handleClickPlace = (myPlace) => {
    console.log(myPlace);
    setOpen(true); // 모달창 열기
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost/api/interests", {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        });

        console.log("응답: ", response);
        setMyPlaceList(response.data);
      } catch (error) {
        console.error("내 찜 목록 가져오기 실패: ", error);
      }
    };
    fetchData();
  }, [loginToken]);

  return (
    <div id="sub" className="sub-page">
      <div className="wrap">
        <div className="recommand-wrapper">
          <div className="recommand-title">
            {loginToken && myPlaceList.length !== 0 && (
              <p className="mypick-title">
                <span>{loginedUser.name}님</span>이 찜한 여행지들이에요 :)
              </p>
            )}
          </div>
          <div className="container">
            {loginToken && myPlaceList.length === 0 && (
              <div className="when-no-mypick">
                앗, 아직 <span className="my-pick-places">찜한 여행지</span>가 없네요! &nbsp;
                <Link to="search" spy={true} smooth={true} offset={0} duration={1400}>
                  <span className="search-and-pick">여행지를 검색</span>
                </Link>
                해서 <span className="my-heart">하트</span>를 눌러보세요.
              </div>
            )}
            <Swiper
              effect={"coverflow"}
              grabCursor={false}
              centeredSlides={true}
              loop={true}
              slidesPerView={3}
              slidesPerGroup={1}
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
              {myPlaceList.map((v) => (
                <SwiperSlide key={v.id} onClick={() => handleClickPlace(v)} style={{ cursor: "pointer" }}>
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
          {/* <Modal
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
            </Modal> */}
        </div>
      </div>
    </div>
  );
};

export default SubPage;
