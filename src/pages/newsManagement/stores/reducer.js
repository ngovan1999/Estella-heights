import produce from "immer";

import { SAVE_ALL_NEWS, SAVE_LOADING } from "./constants";
import { INIT_STATE_NEWS } from "./states";

export default function newsReducer(state = INIT_STATE_NEWS, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SAVE_LOADING:
        draft.isLoading = action.payload;
        break;
      case SAVE_ALL_NEWS:
        draft.news.data = action.payload;
        break;
      default:
        return state;
    }
  });
}
