import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { pickedRegionState } from "../../../../atoms/userInputData";
import { curCenterState, curLevelState } from "../../../../atoms/map";
import { initializedMap, getKakaoMap } from "./initializeMap";

const { kakao } = window;

const KakaoMap = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [curLevel, setCurLevel] = useRecoilState(curLevelState);
  const [curCenter, setCurCenter] = useRecoilState(curCenterState);
  const [markers, setMarkers] = useState([]); // 마커 배열 상태 추가
  const pickedPlaceList = useRecoilValue(pickedRegionState);

  const handleMarkerClick = (title) => () => {
    const placeByTitle = pickedPlaceList.find((v) => v.title === title);
    const map = getKakaoMap();
    const moveLatLon = new kakao.maps.LatLng(
      placeByTitle.latitude,
      placeByTitle.longitude
    );
    map.setCenter(moveLatLon);
  };

  // 초기화
  useEffect(() => {
    if (!isLoaded) {
      initializedMap();
      setIsLoaded(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const map = getKakaoMap();
    const moveLatLon = new kakao.maps.LatLng(curCenter[0], curCenter[1]);
    map.setCenter(moveLatLon);

    // 줌 레벨 저장
    const zoomChangedHandler = () => {
      let level = curLevel;
      setCurLevel(() => level);
    };

    // 줌 레벨 이벤트 리스너
    kakao.maps.event.addListener(map, "zoom_changed", zoomChangedHandler);

    return () => {
      kakao.maps.event.removeListener(map, "zoom_changed", zoomChangedHandler);
    };
  }, [curCenter, setCurLevel, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const map = getKakaoMap();

    // 처음 실행될 때 마커 다 지우기
    markers.forEach((marker) => marker.setMap(null));

    const positions = pickedPlaceList.map((el) => ({
      title: el.title,
      latlng: new kakao.maps.LatLng(Number(el.latitude), Number(el.longitude)),
      content: el.title, // infoWindow 표시 컨텐츠
    }));

    // 마커 추가 함수
    const addMarker = (position, title) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: position,
        title: title,
      });

      kakao.maps.event.addListener(marker, "click", handleMarkerClick(title));

      return marker;
    };
    console.log(pickedPlaceList);

    // 배열에 추가된 마커를 지도에서 삭제하는 함수
    function hideMarkers() {
      setMarkers(null);
    }

    const newMarkers = [];
    for (var i = 0; i < positions.length; i++) {
      const marker = addMarker(positions[i].latlng, positions[i].title);
      newMarkers.push(marker);
      // 마커에 표시할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content, // 인포윈도우에 표시할 내용
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, infowindow)
      );
      kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infowindow)
      );
    }

    // 마커 상태 업데이트
    hideMarkers();
    setMarkers(newMarkers);
  }, [pickedPlaceList, isLoaded]);

  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
  function makeOverListener(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker);
    };
  }

  // 인포윈도우를 닫는 클로저를 만드는 함수입니다
  function makeOutListener(infowindow) {
    return function () {
      infowindow.close();
    };
  }

  return (
    <div id="map" style={{ width: "100%", height: "100%", zIndex: 15 }}></div>
  );
};

export default KakaoMap;
