import "./index.css";
import { Avatar, Card, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useRecoilState, useSetRecoilState } from "recoil";
import { placeListState } from "../../../../atoms/placeList";
import { pickedRegionState } from "../../../../atoms/userInputData";
const PickedRegion = () => {
  const [placeList, setPlaceList] = useRecoilState(placeListState);
  const setPickedRegion = useSetRecoilState(pickedRegionState);

  const moveLocation = (title, address, lat, lng) => {
    console.log(title, address);
    const newLocation = {
      title: title,
      address: address,
      lat: lat,
      lng: lng,
    };
    setPickedRegion((prev) => [...prev, newLocation]);
  };

  const handleDeletePlace = (val) => {
    const filteredPlaces = [];
    for (const p of placeList) {
      if (p.id !== val) filteredPlaces.push(p);
    }

    setPlaceList(filteredPlaces);
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
            onClick={() => moveLocation(el.title, el.address, el.lat, el.lng)}
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
