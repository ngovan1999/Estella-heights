import {
  SET_LOADING,
  SAVE_LOADING,
  GET_ALL_LIST,
  SAVE_ALL_LIST,
} from "./constants";

export function setLoading(payload) {
  return {
    type: SET_LOADING,
    payload,
  };
}

export function saveLoading(payload) {
  return {
    type: SAVE_LOADING,
    payload,
  };
}

export function getAllListRequest(payload) {
  return {
    type: GET_ALL_LIST,
    payload,
  };
}

export function saveAllList(payload) {
  return {
    type: SAVE_ALL_LIST,
    payload,
  };
}
