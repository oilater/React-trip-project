import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: "loginState",
  default: false,
  // effects_UNSTABLE: [persistAtom],
});

export const loginTokenState = atom({
  key: "loginTokenState",
  default: "",
  // effects_UNSTABLE: [persistAtom],
});

export const loginedUserState = atom({
  key: "loginedUserState",
  default: {},
  // effects_UNSTABLE: [persistAtom],
});
