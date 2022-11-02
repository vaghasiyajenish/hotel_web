import { hotleTypes } from "../../Actiontypes/hotelTypes";
import {
  FetchHotleFailure,
  FetchHotleFailurePayload,
  FetchHotleRequest,
  FetchHotleSuccess,
  FetchHotleSuccessPayload,
} from "../../types/types";

export const fetchHotleRequest = (): FetchHotleRequest => ({
  type: hotleTypes.FETCH_HOTLE_REQUEST,
});

export const fetchHotleSuccess = (
  payload: FetchHotleSuccessPayload
): FetchHotleSuccess => ({
  type: hotleTypes.FETCH_HOTLE_SUCCESS,
  payload,
});

export const fetchPostsFailure = (
  payload: FetchHotleFailurePayload
): FetchHotleFailure => ({
  type: hotleTypes.FETCH_HOTEL_FAILURE,
  payload,
});
