import { IHotelList } from "../models/IHotelList";
import { hotleTypes } from "../Actiontypes/hotelTypes";

export interface HotleState {
  loading: boolean;
  hotleData: IHotelList[];
  error: string | null;
}

export interface FetchHotleSuccessPayload {
  hotleData: IHotelList[];
}

export interface FetchHotleFailurePayload {
  error: string;
}

export interface FetchHotleRequest {
  type: typeof hotleTypes.FETCH_HOTLE_REQUEST;
}

export type FetchHotleSuccess = {
  type: typeof hotleTypes.FETCH_HOTLE_SUCCESS;
  payload: FetchHotleSuccessPayload;
};

export type FetchHotleFailure = {
  type: typeof hotleTypes.FETCH_HOTEL_FAILURE;
  payload: FetchHotleFailurePayload;
};

export type HotleActions =
  | FetchHotleRequest
  | FetchHotleSuccess
  | FetchHotleFailure;
