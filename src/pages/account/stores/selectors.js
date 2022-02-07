import { createSelector } from "reselect";
import { INIT_STATE_ACCOUNT } from "./states";
const selectAccount = (state) => state.accountReducers || INIT_STATE_ACCOUNT;
const selectLoading = createSelector(selectAccount, (state) => state.isLoading);
const selectDataUser = createSelector(selectAccount, (state) => state.dataUser);

export { selectLoading, selectDataUser };
