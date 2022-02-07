import {
  SET_LOADING,
  SAVE_LOADING,
  SAVE_ALL_USER_ACCOUNT,
  GET_ALL_USER_ACCOUNT,
  CREATE_USER_REQUEST,
  DELETE_USER_SUCCESS
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
export function getAllAcountUser(payload) {
  return {
    type: GET_ALL_USER_ACCOUNT,
    payload,
  };
}

export function saveAllAccountUser(payload) {
  return {
    type: SAVE_ALL_USER_ACCOUNT,
    payload,
  };
}

export const asyncCreateUserRequest = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: CREATE_USER_REQUEST, payload, resolve })
  );

export const deleteUserSuccess = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: DELETE_USER_SUCCESS, payload, resolve })

  );
