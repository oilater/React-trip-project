import { atom } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const loginTokenState = atom({
  key: "loginTokenState",
  default: "",
});
