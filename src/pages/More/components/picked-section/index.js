import { useRecoilState, useSetRecoilState } from "recoil";
import { pickedRegionState } from "../../../../atoms/userInputData"; // 유저가 좌측 화면에서 픽한 장소들
import { curCenterState } from "../../../../atoms/map";
import { curLevelState } from "../../../../atoms/map";
import { Card, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./index.css";

const PickedRegion = () => {
  const setCurLevel = useSetRecoilState(curLevelState);
  const setCurCenter = useSetRecoilState(curCenterState);
  const [pickedRegion, setPickedRegion] = useRecoilState(pickedRegionState);

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
      setCurLevel(7);
    } else {
      setPickedRegion((prev) => [...prev, newLocation]);
      setCurCenter([lat, lng]);
      setCurLevel(7);
    }
  };

  const handleDeletePlace = (val) => {
    const updatePlace = pickedRegion.filter((place) => place.id !== val);
    setPickedRegion(updatePlace);
  };

  const resetPlaceList = () => {
    setPickedRegion([]);
  };

  return (
    <div className="wrapper">
      <div className="title-wrapper">
        <div className="title">
          <p>{pickedRegion.length}</p>
          <span>내가 고른 장소</span>
        </div>
        <div className="reset">
          <button className="reset-btn" onClick={() => resetPlaceList()}>
            장소 설정 초기화
          </button>
        </div>
      </div>
      <div className="picked-list">
        {pickedRegion.map((el) => (
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
                <img
                  style={{
                    width: "4.5rem",
                    height: "4.5rem",
                    borderRadius: 15,
                  }}
                  src={el.mainImagePath}
                  alt="카드 장소 이미지"
                />
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
