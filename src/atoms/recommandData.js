import { atom } from "recoil";

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
