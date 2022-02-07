import { combineReducers } from "redux";
import authenReducers from "../../pages/login/stores/reducer";
import accountReducers from "../../pages/account/stores/reducer";
import listBookingReducers from "../../pages/servicesManagement/listBookingServices/stores/reducer";
import userReducers from "../../pages/userManagement/stores/reducer";
import serviceProducers from "../../pages/servicesManagement/systemsServices/stores/reducer";
import newsReducer from "../../pages/newsManagement/stores/reducer";

export default function createReducer() {
  const rootReducer = combineReducers({
    authenReducers,
    accountReducers,
    listBookingReducers,
    userReducers,
    newsReducer,
    serviceProducers,
  });
  return rootReducer;
}
