import { atom } from "recoil";

export const pickedPlacesState = atom({
  key: "pickedPlacesState",
  default: new Set(),
});
