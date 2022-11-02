import { all, fork } from "redux-saga/effects";
import postsSaga from "./hotelSaga/hotleSaga";

export function* rootSaga() {
  yield all([fork(postsSaga)]);
}
