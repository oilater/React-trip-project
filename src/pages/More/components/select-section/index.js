import "./index.css";
import { placeListState } from "../../../../atoms/placeList";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Tabs, Input, Avatar, Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Search } = Input;
const onChange = (key) => {
  console.log(key);
};

const onSearch = (value, _e, info) => console.log(info?.source, value);
const SelectMoreRegion = () => {
  const [place, setPlace] = useRecoilState(placeListState);

  const curPlaceData = [
    {
      id: 1,
      title: "서울숲",
      address: "서울특별시 강서구",
    },
    {
      id: 2,
      title: "멀티캠퍼스",
      address: "서울특별시 강남구 역삼동",
    },
    {
      id: 3,
      title: "일원동",
      address: "서울특별시 강남구 일원동",
    },
  ];

  const handleSelectPlace = (placeData) => {
    setPlace((origin) => [...origin, placeData]);
    console.log(placeData);
  };

  const items = [
    {
      key: "1",
      label: "관광지",
      children: [
        curPlaceData.map((el) => (
          <Card
            className="antd-card"
            style={{
              width: 430,
              marginTop: 5,
              cursor: "pointer",
            }}
          >
            <div className="card">
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              <div className="card-text-wrapper">
                <div id="title" className="card-title">
                  {el.title}
                </div>
                <div id="address" className="card-address">
                  {el.address}
                </div>
              </div>
              <div className="add-btn">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="small"
                  style={{ backgroundColor: "#E0E0E0" }}
                  onClick={() => handleSelectPlace(el)}
                />
              </div>
            </div>
          </Card>
        )),
      ],
    },
    {
      key: "2",
      label: "식당",
      children: (
        <Card
          className="atnd-card"
          style={{
            width: 430,
            marginTop: 5,
            cursor: "pointer",
          }}
        >
          <div className="card">
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
            <div className="card-text-wrapper">
              <div className="card-title">타워팰리스</div>
              <div className="card-address">서울특별시 강남구</div>
            </div>
            <div className="add-btn">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="small"
                style={{ backgroundColor: "#E0E0E0" }}
                onClick={handleSelectPlace}
              />
            </div>
          </div>
        </Card>
      ),
    },
    {
      key: "3",
      label: "숙소",
      children: (
        <Card
          className="antd-card"
          style={{
            width: 430,
            marginTop: 5,
            cursor: "pointer",
          }}
        >
          <div className="card">
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
            <div className="card-text-wrapper">
              <div className="card-title">서울숲</div>
              <div className="card-address">서울특별시 강서구</div>
            </div>
            <div className="add-btn">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="small"
                style={{ backgroundColor: "#E0E0E0" }}
                onClick={handleSelectPlace}
              />
            </div>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="select-region-wrapper">
      <div className="region-title">서울</div>
      <div className="region-search-bar">
        <Search
          placeholder="장소명을 입력하세요"
          onSearch={onSearch}
          style={{
            width: 430,
            paddingBottom: 10,
          }}
        />
      </div>
      <div className="region-tap">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          size="large"
          tabBarGutter={100}
          tabBarStyle={{ paddingLeft: 50, fontWeight: 600 }}
        />
      </div>
    </div>
  );
};

export default SelectMoreRegion;
