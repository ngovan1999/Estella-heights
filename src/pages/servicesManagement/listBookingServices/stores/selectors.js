import { createSelector } from "reselect";
import { INIT_STATE } from "./states";

const selectBooking = (state) => state.listBookingReducers || INIT_STATE;

const selectLoading = createSelector(selectBooking, (state) => state.isLoading);
const selectDataBooking = createSelector(
  selectBooking,
  (state) => state.dataListBooking
);

export { selectLoading, selectDataBooking };
