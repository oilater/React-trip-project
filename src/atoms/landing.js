import { atom } from "recoil";

export const regionModalState = atom({
  key: "regionModalState",
  default: true,
});

export const keywordModalState = atom({
  key: "keywordModalState",
  default: false,
});

export const recommandModalState = atom({
  key: "recommandModalState",
  default: false,
});
