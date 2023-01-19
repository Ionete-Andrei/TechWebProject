import { atom } from "recoil";

const listData = atom({
  key: "listDataState",
  default: [],
});

const route = atom({
  key: "routeState",
  default: "",
});

const user = atom({
  key: "userState",
  default: undefined,
});

const friends = atom({
  key: "friendsState",
  default: [],
});

const currentFriend = atom({
  key: "currentFriendState",
  default: undefined,
});

// Those are not the producs of the current user, those are the currently diplayed products
const currentProducts = atom({
  key: "currentProductsState",
  default: [],
});

export { listData, route, user, friends, currentFriend, currentProducts };
