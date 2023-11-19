import { atom } from "recoil";

// More 페이지 : 유저가 선택한 지역을 기반으로 한 모든 지역 정보들
export const placeListState = atom({
  key: "placeListState",
  default: [],
});
