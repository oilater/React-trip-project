import { useRecoilState, useSetRecoilState } from "recoil";
import { placeListState } from "../../../../atoms/placeList";
import { pickedRegionState } from "../../../../atoms/userInputData";
import { curCenterState } from "../../../../atoms/map";
import { curLevelState } from "../../../../atoms/map";
import { Avatar, Card, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./index.css";
import { getKakaoMap } from "../kakaomaps/initializeMap";
const { kakao } = window;
const PickedRegion = () => {
  const [placeList, setPlaceList] = useRecoilState(placeListState);
  const setCurLevel = useSetRecoilState(curLevelState);
  const setCurCenter = useSetRecoilState(curCenterState);
  const [pickedRegion, setPickedRegion] = useRecoilState(pickedRegionState);

  const kakaoMap = getKakaoMap();

  const moveLocation = (title, address, lat, lng) => {
    console.log(title, address, lat, lng);
    const newLocation = {
      title: title,
      address: address,
      latitude: lat,
      longitude: lng,
    };
    if (pickedRegion.find((v) => v.title === title)) {
      setCurCenter([lat, lng]);
      setCurLevel(6);
    } else {
      setPickedRegion((prev) => [...prev, newLocation]);
      setCurCenter([lat, lng]);
      setCurLevel(6);
    }
  };

  // // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
  // const setMarkers = () => {
  //   const markers = kakao.maps.Marker();
  //   console.log(markers);
  //   for (var i = 0; i < markers.length; i++) {
  //     markers[i].setMap(kakaoMap);
  //   }
  // };

  const handleDeletePlace = (val) => {
    const updatePlace = placeList.filter((place) => place.id !== val);
    // const filteredPlaces = [];
    // for (const p of placeList) {
    //   if (p.id !== val) filteredPlaces.push(p);
    // }

    setPlaceList(updatePlace);
  };

  const resetPlaceList = () => {
    setPlaceList([]);
  };

  return (
    <div className="wrapper">
      <div className="title-wrapper">
        <div className="title">
          <p>{placeList.length}</p>
          <span>내가 고른 장소</span>
        </div>
        <div className="reset">
          <button className="reset-btn" onClick={() => resetPlaceList()}>
            장소 설정 초기화
          </button>
        </div>
      </div>
      <div className="picked-list">
        {placeList.map((el) => (
          <div
            onClick={() =>
              moveLocation(el.title, el.address, el.latitude, el.longitude)
            }
          >
            <Card
              className="antd-card"
              style={{
                width: 390,
                marginTop: 5,
                cursor: "pointer",
              }}
              key={`picked-${el.id}`}
            >
              <div className="card">
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                <div className="card-text-wrapper">
                  <div className="card-title">{el.title}</div>
                  <div className="card-address">{el.address}</div>
                </div>
                <div className="add-btn">
                  <Button
                    type="primary"
                    icon={<CloseOutlined />}
                    size="small"
                    style={{ backgroundColor: "#E0E0E0" }}
                    onClick={() => handleDeletePlace(el.id)}
                  />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickedRegion;
