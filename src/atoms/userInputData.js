import { atom } from "recoil";

export const regionInputState = atom({
  key: "regionInputState",
  default: {
    key: "",
    value: "",
  },
});

export const keywordInputState = atom({
  key: "keywordInputState",
  default: new Set(),
});
