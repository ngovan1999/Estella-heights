import { takeLatest, call, put } from "redux-saga/effects";
import { setLoadingStep, saveALLServices } from "./actions";
import {
  getListService,
  createServiceRequest,
  deleteRequest,
} from "../../../../services/serviceSystem";
import {
  GET_ALL_SERVICES,
  CREATE_SERVICE_REQUEST,
  DELETE_SUCCESS,
} from "./constants";

function* getServiceSaga({ payload }) {
  try {
    yield put(setLoadingStep(true));
    const services = yield call(getListService, payload);
    yield put(saveALLServices(services.data.result));
    yield put(setLoadingStep(false));
  } catch (e) {
    yield put(setLoadingStep(false));
  }
}

export function* getDataService() {
  yield takeLatest(GET_ALL_SERVICES, getServiceSaga);
}

function* createServiceSaga({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const response = yield call(createServiceRequest, payload);
    resolve(response);

    yield put(setLoadingStep(false));
  } catch (error) {
    console.log(error);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}

function* deleteServiceSaga({ payload, resolve }) {
  try {
    yield put(setLoadingStep(true));
    const res = yield call(deleteRequest, payload);
    resolve(res);
    yield put(setLoadingStep(false));
  } catch (e) {
    console.log(e);
    resolve(null);
    yield put(setLoadingStep(false));
  }
}

export function* createServices() {
  yield takeLatest(CREATE_SERVICE_REQUEST, createServiceSaga);
}

export function* deleteServices() {
  yield takeLatest(DELETE_SUCCESS, deleteServiceSaga);
}
