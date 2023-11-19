import { atom } from "recoil";
export const curCenterState = atom({
  key: "curCenterState",
  default: [33.45172321560444, 126.5665260371922],
});

export const curLevelState = atom({
  key: "curLevelState",
  default: 9,
});
