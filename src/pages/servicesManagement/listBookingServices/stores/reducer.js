import { INIT_STATE } from "./states";
import produce from "immer";

import { SAVE_LOADING, SAVE_ALL_LIST } from "./constants";

export default function listBookingReducers(state = INIT_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SAVE_LOADING:
        draft.isLoading = action.payload;
        break;
      case SAVE_ALL_LIST:
        draft.dataListBooking = action.payload;
        break;
      default:
        return state;
    }
  });
}
