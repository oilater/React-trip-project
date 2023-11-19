import { atom } from "recoil";

// 사용자의 입력을 기반으로 추천해주는 여행지 목록들
export const recommandListState = atom({
  key: "recommandListState",
  default: [
    {
      id: "",
      title: "",
      address: "",
      overview: "",
      mainImagePath: "",
    },
  ],
});

// 내가 찜한 관광지 목록
export const attractionListState = atom({
  key: "attractionListState",
  default: [
    {
      id: "",
      type: "",
      title: "",
      address: "",
      overview: "",
      latitude: "",
      longitude: "",
      mainImagePath: "",
    },
  ],
});
// 내가 찜한 음식점 목록
export const restaurantListState = atom({
  key: "restaurantListState",
  default: [
    {
      id: "",
      type: "",
      title: "",
      address: "",
      overview: "",
      latitude: "",
      longitude: "",
      mainImagePath: "",
    },
  ],
});
// 내가 찜한 숙소 목록
export const accomodationListState = atom({
  key: "accomodationListState",
  default: [
    {
      id: "",
      type: "",
      title: "",
      address: "",
      overview: "",
      latitude: "",
      longitude: "",
      mainImagePath: "",
    },
  ],
});
