import { takeLatest, call, put } from "redux-saga/effects";
import {
  getAllUserManager,
  createUserManager,
  deleteUserManager,
} from "../../../services/account";
import {
  GET_ALL_USER_ACCOUNT,
  DELETE_USER_SUCCESS,
  CREATE_USER_REQUEST,
} from "./constants";
import { saveLoading, saveAllAccountUser } from "./actions";

function* getAllAccountUserManger({ payload }) {
  try {
    yield put(saveLoading(true));
    const reponse = yield call(getAllUserManager, payload);
    yield put(saveAllAccountUser(reponse.data.result));
    yield put(saveLoading(false));
  } catch (error) {
    console.log(error);
    yield put(saveLoading(false));
  }
}

export function* sagaAccountUserManager() {
  yield takeLatest(GET_ALL_USER_ACCOUNT, getAllAccountUserManger);
}

function* createUserSaga({ payload, resolve }) {
  try {
    yield put(saveLoading(true));
    const response = yield call(createUserManager, payload);
    resolve(response);
    yield put(saveLoading(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(saveLoading(false));
  }
}
export function* createUser() {
  yield takeLatest(CREATE_USER_REQUEST, createUserSaga);
}

function* deleteUserSaga({ payload, resolve }) {
  try {
    yield put(saveLoading(true));
    const res = yield call(deleteUserManager, payload);
    resolve(res);
    yield put(saveLoading(false));
  } catch (e) {
    console.log(e);
    resolve(null);
    yield put(saveLoading(false));
  }
}

export function* deleteUser() {
  yield takeLatest(DELETE_USER_SUCCESS, deleteUserSaga);
}
