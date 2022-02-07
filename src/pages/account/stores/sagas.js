import { takeLatest, call, put } from "redux-saga/effects";

import {
  changePassRequestService,
  getAllUserRequest,
  createUserResidentRequest,
} from "../../../services/account";
import {
  CHANGE_ACCOUNT_REQUEST,
  GET_ALL_USER,
  CREAT_USER_RESIDENT,
} from "./constants";
import { saveLoading, saveAllUser } from "./actions";

function* changeAccount({ payload, resolve }) {
  try {
    yield put(saveLoading(true));
    const response = yield call(changePassRequestService, payload);
    resolve(response);
    yield put(saveLoading(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(saveLoading(false));
  }
}

export function* changeAccountSaga() {
  yield takeLatest(CHANGE_ACCOUNT_REQUEST, changeAccount);
}

function* getListUserResident({ payload }) {
  try {
    yield put(saveLoading(true));
    const response = yield call(getAllUserRequest, payload);
    console.log(response.data.result);
    yield put(saveLoading(false));

    yield put(saveAllUser(response.data.result));
  } catch (error) {
    console.log(error);
  }
}

export function* residentAccount() {
  yield takeLatest(GET_ALL_USER, getListUserResident);
}

function* createUserResident({ payload, resolve }) {
  try {
    yield put(saveLoading(true));
    const response = yield call(createUserResidentRequest, payload);
    resolve(response);
    yield put(saveLoading(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(saveLoading(false));
  }
}
export function* createUser() {
  yield takeLatest(CREAT_USER_RESIDENT, createUserResident);
}
