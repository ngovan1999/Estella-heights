import { createSelector } from "reselect";
import { INIT_STATE_USER_MANAGER } from "./states";

const selectAccount = (state) => state.userReducers || INIT_STATE_USER_MANAGER;
const selectLoading = createSelector(selectAccount, (state) => state.isLoading);
const selectDataUser = createSelector(selectAccount, (state) => state.dataUser);

const selectDataAccountManager = createSelector(
  selectAccount,
  (state) => state.dataUserAcount
);

export { selectLoading, selectDataUser, selectDataAccountManager };
