let globalMap;
const { kakao } = window;

export function initializedMap() {
  const mapContainer = document.getElementById("map");
  const mapOption = {
    center: new kakao.maps.LatLng(37.5, 126.9),
    level: 5,
  };

  globalMap = new kakao.maps.Map(mapContainer, mapOption);
}

export function getKakaoMap() {
  return globalMap;
}
