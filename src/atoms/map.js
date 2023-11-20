import { atom } from "recoil";
export const curCenterState = atom({
  key: "curCenterState",
  default: [],
});

export const curLevelState = atom({
  key: "curLevelState",
  default: 10,
});
