import { atom } from "recoil";

// 내가 찜한 관광지 목록
export const myAttractionListState = atom({
  key: "myAttractionListState",
  default: new Set(),
});
// 내가 찜한 음식점 목록
export const myRestaurantListState = atom({
  key: "myRestaurantListState",
  default: new Set(),
});
// 내가 찜한 숙소 목록
export const myAccomodationListState = atom({
  key: "myAccomodationListState",
  default: new Set(),
});
