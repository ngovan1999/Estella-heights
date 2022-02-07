import {
  SET_LOADING,
  SAVE_LOADING,
  GET_ALL_ACCOUNT,
  SAVE_ALL_ACCOUNT,
  CHANGE_ACCOUNT_REQUEST,
  GET_ALL_USER,
  CREAT_USER_RESIDENT,
  SAVE_ALL_USER,
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

export function getAllAccountRequest(payload) {
  return {
    type: GET_ALL_ACCOUNT,
    payload,
  };
}

export function saveAllAccount(payload) {
  return {
    type: SAVE_ALL_ACCOUNT,
    payload,
  };
}

export const asyncChangeAccountRequest = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: CHANGE_ACCOUNT_REQUEST, payload, resolve })
  );

export function getAllUserRequest(payload) {
  return {
    type: GET_ALL_USER,
    payload,
  };
}

export function saveAllUser(payload) {
  return {
    type: SAVE_ALL_USER,
    payload,
  };
}

export const asyncCreateUserResident = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: CREAT_USER_RESIDENT, payload, resolve })
  );
