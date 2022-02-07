import { takeLatest, call, put } from "redux-saga/effects";
import { saveAllList, saveLoading } from "./actions";
import { getListBooking } from "../../../../services/listBooking";
import { GET_ALL_LIST } from "./constants";

function* getAllListBooking({ payload }) {
  try {
    yield put(saveLoading(true));
    const response = yield call(getListBooking, payload);
    yield put(saveAllList(response.data.result));
    console.log(response);
    yield put(saveLoading(false));
  } catch (error) {
    console.log(error);
  }
}

export function* getListBookingSaga() {
  yield takeLatest(GET_ALL_LIST, getAllListBooking);
}
