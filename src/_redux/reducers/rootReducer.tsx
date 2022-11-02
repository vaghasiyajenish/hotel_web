import { combineReducers } from "redux";
import hotleReducer from "./hotleReducer/hotleReducer";

const rootReducer = combineReducers({
  hotleData: hotleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
