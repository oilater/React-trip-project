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
