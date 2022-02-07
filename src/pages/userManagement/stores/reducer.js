import produce from "immer";
import { SAVE_LOADING, SAVE_ALL_USER_ACCOUNT } from "./constants";
import { INIT_STATE_USER_MANAGER } from "./states";

export default function userReducers(state = INIT_STATE_USER_MANAGER, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SAVE_LOADING:
        draft.isLoading = action.payload;
        break;
      case SAVE_ALL_USER_ACCOUNT:
        console.log(action.payload);
        draft.dataUserAcount = action.payload;
        break;
      default:
        return state;
    }
  });
}
