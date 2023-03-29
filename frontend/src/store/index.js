import {
  combineReducers,
  applyMiddleware,
  createStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userPostsReducer,
} from "./Users/userReducer";
import {
  trainingListReducer,
  trainingDetailsReducer,
  trainingDeleteReducer,
  trainingCreateReducer,
  trainingUpdateReducer,
  trainingReviewCreateReducer,
  trainingTypeReducer,
  trainingToggleLikeReducer,
} from "./Training/trainingReducer";
import {
  menuListReducer,
  menuDetailsReducer,
  menuDeleteReducer,
  menuCreateReducer,
  menuUpdateReducer,
  menuReviewCreateReducer,
  menuTypeReducer,
  menuToggleLikeReducer,
} from "./Menus/menuReducer";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userPosts: userPostsReducer,
  trainingList: trainingListReducer,
  trainingDetails: trainingDetailsReducer,
  trainingDelete: trainingDeleteReducer,
  trainingCreate: trainingCreateReducer,
  trainingUpdate: trainingUpdateReducer,
  trainingReviewCreate: trainingReviewCreateReducer,
  trainingTypeList: trainingTypeReducer,
  trainingToggleLike: trainingToggleLikeReducer,
  menuList: menuListReducer,
  menuDetails: menuDetailsReducer,
  menuDelete: menuDeleteReducer,
  menuCreate: menuCreateReducer,
  menuUpdate: menuUpdateReducer,
  menuReviewCreate: menuReviewCreateReducer,
  menuTypeList: menuTypeReducer,
  menuToggleLike: menuToggleLikeReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
