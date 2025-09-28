import { userReducer } from "@/store/user";
import { combineReducers } from "redux";

export const reducers = combineReducers({
  user: userReducer,
});
