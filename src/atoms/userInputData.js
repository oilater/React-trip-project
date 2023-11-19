import { atom } from "recoil";

// DB에서 받아온 지역 정보들
export const regionInputState = atom({
  key: "regionInputState",
  default: {
    code: "",
    name: "",
  },
});

// 유저가 선택한 지역 정보
export const pickedRegionState = atom({
  key: "pickedRegionState",
  default: [],
});

// 유저가 선택한 키워드 정보
export const keywordInputState = atom({
  key: "keywordInputState",
  default: new Set(),
});
