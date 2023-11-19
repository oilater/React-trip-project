import { atom } from "recoil";

// PlaceList에서 유저가 plus 버튼 눌러 선택한 지역들
export const pickedPlacesState = atom({
  key: "pickedPlacesState",
  default: new Set(),
});
