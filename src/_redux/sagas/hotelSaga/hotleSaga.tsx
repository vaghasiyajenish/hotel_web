import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { IHotelList } from "../../models/IHotelList";
import {
  fetchPostsFailure,
  fetchHotleSuccess,
} from "../../actions/hotelActions/hotleActions";
import { hotleTypes } from "../../Actiontypes/hotelTypes";

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

const getHotle = () =>
  axios.get<IHotelList[]>(
    "https://635fb9f7ca0fe3c21aa2dd22.mockapi.io/api/v1/hotel-list"
  );

function* fetchHotleSaga() {
  try {
    const response: ResponseGenerator = yield call(getHotle);
    yield put(
      fetchHotleSuccess({
        hotleData: response.data,
      })
    );
  } catch (e: any) {
    yield put(
      fetchPostsFailure({
        error: e.message,
      })
    );
  }
}

function* hotleDataSaga() {
  yield all([takeLatest(hotleTypes.FETCH_HOTLE_REQUEST, fetchHotleSaga)]);
}

export default hotleDataSaga;
