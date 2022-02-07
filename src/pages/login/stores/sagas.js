import { takeLatest, put, call } from "redux-saga/effects";
import { loginRequestService } from "../../../services/login";
import { saveDataLogin, setLoading } from "./actions";
import { LOGIN_REQUEST } from "./constants";

function* sendLoginRequest({ payload, resolve }) {
  try {
    yield put(setLoading(true));
    const response = yield call(loginRequestService, payload);
    if (response.status === 200) {
      resolve(response.data.result);
    }
    yield put(setLoading(false));

    yield put(saveDataLogin(response.data.result));
  } catch (err) {
    console.error(err);
    resolve(null);
  }
}
export function* sagaLogin() {
  yield takeLatest(LOGIN_REQUEST, sendLoginRequest);
}
