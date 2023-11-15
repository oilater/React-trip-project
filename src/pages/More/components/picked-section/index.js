import "./index.css";
import { Avatar, Card, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { placeListState } from "../../../../atoms/placeList";
const PickedRegion = () => {
  const [placeList, setPlaceList] = useRecoilState(placeListState);

  const handleDeletePlace = (val) => {
    // const target = e.target.closest(".antd-card");

    const filteredPlace = [];
    for (const p of placeList) {
      if (p.id !== val) filteredPlace.push(p);
    }
    setPlaceList(filteredPlace);
  };

  const resetPlaceList = () => {
    setPlaceList([]);
  };

  return (
    <div className="wrapper">
      <div className="title-wrapper">
        <div className="title">
          <p>{placeList.length}</p>
        </div>
        <div className="reset">
          <button className="reset-btn" onClick={() => resetPlaceList()}>
            장소 설정 초기화
          </button>
        </div>
      </div>
      <div className="picked-list">
        {placeList.map((el) => (
          <Card
            className="antd-card"
            style={{
              width: 390,
              marginTop: 5,
              cursor: "pointer",
            }}
            key={el.id}
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
        ))}
      </div>
    </div>
  );
};

export default PickedRegion;
