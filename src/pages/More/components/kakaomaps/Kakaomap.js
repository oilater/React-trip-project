import { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { pickedRegionState } from "../../../../atoms/userInputData";
import { curCenterState } from "../../../../atoms/map";
import { curLevelState } from "../../../../atoms/map";
import { initializedMap, getKakaoMap } from "./initializeMap";
const { kakao } = window;

const KakaoMap = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [curLevel, setCurLevel] = useRecoilState(curLevelState);
  const [curCenter, setCurCenter] = useRecoilState(curCenterState);

  const pickedPlaceList = useRecoilValue(pickedRegionState);
  console.log(pickedPlaceList);
  const handleMarkerClick = (title) => {
    return function () {
      const placeByTitle = pickedPlaceList.find((v) => v.title === title);
      const map = getKakaoMap();
      console.log(map);
      const moveLatLon = new kakao.maps.LatLng(
        placeByTitle.latitude,
        placeByTitle.longitude
      );
      map.setCenter(moveLatLon);
      // setCurCenter(placeByTitle.latitude, placeByTitle.longitude);
    };
  };

  // 처음 로드했을 때 1회용
  useEffect(() => {
    if (!isLoaded) {
      initializedMap();
      setIsLoaded(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    const map = getKakaoMap();
    console.log(map);
    const moveLatLon = new kakao.maps.LatLng(curCenter[0], curCenter[1]);
    map.setCenter(moveLatLon);

    kakao.maps.event.addListener(map, "zoom_changed", function () {
      let level = map.getLevel();
      setCurLevel(() => level);
    });
  }, [curCenter, setCurLevel, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    console.log("!!!!!!!!!!!!!!!");

    // const mapContainer = document.getElementById("map");
    // const mapOption = {
    //   center: new kakao.maps.LatLng(curCenter[0], curCenter[1]),
    //   level: curLevel,
    // };
    const map = getKakaoMap();
    console.log(map);
    // const moveLatLon = new kakao.maps.LatLng(curCenter[0], curCenter[1]);
    // map.setCenter(moveLatLon);

    // const map = new kakao.maps.Map(mapContainer, mapOption);

    const positions = pickedPlaceList.map((el) => ({
      title: el.title,
      latlng: new kakao.maps.LatLng(Number(el.latitude), Number(el.longitude)),
    }));

    // 마커 이미지의 이미지 주소입니다
    var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    var marker = null;

    console.log(pickedPlaceList);
    console.log(marker);
    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(
        marker,
        "click",
        handleMarkerClick(positions[i].title)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedPlaceList]);

  return (
    <div id="map" style={{ width: "100%", height: "100%", zIndex: 15 }}></div>
  );
};

export default KakaoMap;
