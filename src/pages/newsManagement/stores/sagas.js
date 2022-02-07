import { takeLatest, call, put } from "redux-saga/effects";
import * as api from "../../../services/newsService";
import { saveAllNews, asyncCreateNews, saveLoading } from "./actions";

import { GET_ALL_NEWS, CREATE_NEWS } from "./constants";

function* getAllNewsSaga({ payload }) {
  try {
    yield put(saveLoading(true));
    const res = yield call(api.getNewsData, payload);
    yield put(saveLoading(false));
    yield put(saveAllNews(res.data.result));
  } catch (error) {
    console.log(error);
  }
}

export function* sagaNews() {
  yield takeLatest(GET_ALL_NEWS, getAllNewsSaga);
}

function* createNewsRequest({ payload, resolve }) {
  try {
    yield put(saveLoading(true));
    const response = yield call(api.createNews, payload);
    console.log(response);
    resolve(response);
    yield put(saveLoading(false));
  } catch (error) {
    resolve(null);
    yield put(saveLoading(false));
  }
}

export function* createNewsSagas() {
  yield takeLatest(CREATE_NEWS, createNewsRequest);
}
