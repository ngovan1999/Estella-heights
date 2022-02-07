import { SAVE_LOADING, SAVE_LOGIN_DATA, SET_LOADING } from "./constants";
import produce from "immer";

import { INIT_STATE_LOGIN } from "./states";
export default function authenReducers(state = INIT_STATE_LOGIN, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case SAVE_LOGIN_DATA:
        const authority = action.payload;
        sessionStorage.setItem("token", authority.token);
        sessionStorage.setItem("roles", JSON.stringify(authority.roles));
        sessionStorage.setItem("username", authority.username);
        sessionStorage.setItem(
          "tokenExpired",
          authority.tokenExpired.toString()
        );
        sessionStorage.setItem("refreshToken", authority.refreshToken);
        draft.profile = authority;
        break;
      default:
        return state;
    }
  });
}
