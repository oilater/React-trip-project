import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { pickedRegionState } from "../../../../atoms/userInputData";
const { kakao } = window; //window 전역 객체에 들어있는 kakao maps api를 가져옴
const KakaoMap = () => {
  const [curLevel, setCurLevel] = useState(9);
  const [curCenter, setCurCenter] = useState([
    33.45172321560444, 126.5665260371922,
  ]);

  const pickedRegion = useRecoilValue(pickedRegionState); // 유저가 선택한 장소 (명소, 음식점, 숙소)

  useEffect(() => {
    const mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(curCenter[0], curCenter[1]), // 지도의 중심좌표
        level: curLevel, // 지도의 확대 레벨
      };

    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커를 표시할 위치와 title 객체 배열입니다
    const positions = pickedRegion.map((el) => {
      return {
        title: el.title, // 장소 이름
        latlng: new kakao.maps.LatLng(Number(el.lat), Number(el.lng)), // 위치 정보(위도, 경도)
      };
    });

    // 이벤트
    kakao.maps.event.addListener(map, "zoom_changed", function () {
      // 지도의 현재 레벨을 얻어옵니다
      let level = map.getLevel(); // 현재 줌한 레벨
      setCurLevel(() => level); // 현재 줌 레벨을 저장
    });

    // 마커 이미지의 이미지 주소입니다
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    // 마커 이미지의 이미지 크기 입니다
    const imageSize = new kakao.maps.Size(30, 42);

    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 지도 중심 위치 이동
      const center = positions[i].latlng;
      setCurCenter([center.getLat(), center.getLng()]);

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    }
  }, [pickedRegion]);

  return (
    <div id="map" style={{ width: "100%", height: "100%", zIndex: 15 }}></div>
  );
};

export default KakaoMap;
