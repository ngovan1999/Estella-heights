import { all } from "redux-saga/effects";
import * as LoginSagas from "../../pages/login/stores/sagas";
import * as accountSagas from "../../pages/account/stores/sagas";
import * as userSaga from "../../pages/userManagement/stores/sagas";
import * as listBookingSagas from "../../pages/servicesManagement/listBookingServices/stores/sagas";
import * as servicesSagas from "../../pages/servicesManagement/systemsServices/stores/sagas";
import * as newsSagas from "../../pages/newsManagement/stores/sagas";

export default function* () {
  yield all([
    //login
    LoginSagas.sagaLogin(),
    //account
    accountSagas.changeAccountSaga(),
    accountSagas.residentAccount(),
    accountSagas.createUser(),
    //listBooking
    listBookingSagas.getListBookingSaga(),

    //allUser
    userSaga.sagaAccountUserManager(),
    userSaga.createUser(),
    userSaga.deleteUser(),

    //Service
    servicesSagas.getDataService(),
    servicesSagas.createServices(),
    servicesSagas.deleteServices(),

    //news
    newsSagas.sagaNews(),
    newsSagas.createNewsSagas(),
  ]);
}
