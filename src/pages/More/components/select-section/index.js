import "./index.css";
import { Tabs, Input, Avatar, Card, Rate } from "antd";
const { Search } = Input;
const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: "관광지",
    children: (
      <Card
        style={{
          width: 430,
          marginTop: 5,
          cursor: "pointer",
        }}
      >
        <div
          style={{
            marginLeft: 5,
            display: "flex",
            flexDirection: "flex-start",
          }}
        >
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
          <div style={{ paddingLeft: 30 }}>
            <div style={{ fontWeight: 600, fontSize: 17 }}>서울숲</div>
            <div style={{ fontSize: 13, color: "rgba(0, 0, 0, 0.45)" }}>
              서울특별시 강서구
            </div>
            <Rate disabled defaultValue={4} />
          </div>
        </div>
      </Card>
    ),
  },
  {
    key: "2",
    label: "식당",
    children: (
      <Card
        style={{
          width: 430,
          marginTop: 5,
        }}
      >
        <div
          style={{
            marginLeft: 5,
            display: "flex",
            flexDirection: "flex-start",
          }}
        >
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
          <div style={{ paddingLeft: 30 }}>
            <div style={{ fontWeight: 600, fontSize: 17 }}>서울숲</div>
            <div style={{ fontSize: 13, color: "rgba(0, 0, 0, 0.45)" }}>
              서울특별시 강서구
            </div>
            <Rate disabled defaultValue={4} />
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
        style={{
          width: 430,
          marginTop: 5,
        }}
      >
        <div
          style={{
            marginLeft: 5,
            display: "flex",
            flexDirection: "flex-start",
          }}
        >
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
          <div style={{ paddingLeft: 30 }}>
            <div style={{ fontWeight: 600, fontSize: 17 }}>서울숲</div>
            <div style={{ fontSize: 13, color: "rgba(0, 0, 0, 0.45)" }}>
              서울특별시 강서구
            </div>
            <Rate disabled defaultValue={4} />
          </div>
        </div>
      </Card>
    ),
  },
];

const onSearch = (value, _e, info) => console.log(info?.source, value);
const SelectMoreRegion = () => {
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
