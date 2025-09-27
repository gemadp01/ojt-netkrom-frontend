// import { counterReducer } from "@/store/counter";
import { userReducer } from "@/store/user";
import { combineReducers } from "redux";

export const reducers = combineReducers({
  user: userReducer,
  // counter: counterReducer,
});
