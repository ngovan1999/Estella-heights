import produce from "immer";
import { SAVE_ALL_USER, SAVE_LOADING } from "./constants";
import { INIT_STATE_ACCOUNT } from "./states";

export default function accountReducers(state = INIT_STATE_ACCOUNT, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SAVE_LOADING:
        draft.isLoading = action.payload;
        break;
      case SAVE_ALL_USER:
        draft.dataUser = action.payload;
        break;
      default:
        return state;
    }
  });
}
