import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { pickedRegionState } from "../../../../atoms/userInputData";

const { kakao } = window;

const KakaoMap = () => {
  const [curLevel, setCurLevel] = useState(9);
  const [curCenter, setCurCenter] = useState([
    33.45172321560444, 126.5665260371922,
  ]);
  const markersRef = useRef([]); // 마커 객체들의 참조를 저장하는 useRef 사용

  const pickedPlaceList = useRecoilValue(pickedRegionState);

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(curCenter[0], curCenter[1]),
      level: curLevel,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    kakao.maps.event.addListener(map, "zoom_changed", function () {
      let level = map.getLevel();
      setCurLevel(() => level);
    });

    const positions = pickedPlaceList.map((el) => ({
      title: el.title,
      latlng: new kakao.maps.LatLng(Number(el.latitude), Number(el.longitude)),
    }));

    // 마커 이미지의 이미지 주소입니다
    var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    }
  }, [pickedPlaceList]);

  return (
    <div id="map" style={{ width: "100%", height: "100%", zIndex: 15 }}></div>
  );
};

export default KakaoMap;
