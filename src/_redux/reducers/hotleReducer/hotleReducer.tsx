import { hotleTypes } from "../../Actiontypes/hotelTypes";
import { HotleActions, HotleState } from "../../types/types";

const initialState: HotleState = {
  loading: true,
  hotleData: [],
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: HotleActions) => {
  switch (action.type) {
    case hotleTypes.FETCH_HOTLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case hotleTypes.FETCH_HOTLE_SUCCESS:
      return {
        ...state,
        loading: false,
        hotleData: action.payload.hotleData,
        error: null,
      };
    case hotleTypes.FETCH_HOTEL_FAILURE:
      return {
        ...state,
        loading: false,
        hotleData: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
