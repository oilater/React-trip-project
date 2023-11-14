import "./index.css";
import { Flex, Tabs } from "antd";
const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: "관광지",
    children: "명소 리스트",
  },
  {
    key: "2",
    label: "식당",
    children: "식당 리스트",
  },
  {
    key: "3",
    label: "숙소",
    children: "숙소 리스트",
  },
];

const SelectMoreRegion = () => {
  return (
    <div className="select-region-wrapper">
      <div className="region-title">서울</div>
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
