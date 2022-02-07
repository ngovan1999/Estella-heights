import {
  GET_ALL_NEWS,
  SAVE_ALL_NEWS,
  CREATE_NEWS,
  SAVE_LOADING,
} from "./constants";
export function saveLoading(payload) {
  return {
    type: SAVE_LOADING,
    payload,
  };
}
export function getAllNews(payload) {
  return { type: GET_ALL_NEWS, payload };
}

export function saveAllNews(payload) {
  return { type: SAVE_ALL_NEWS, payload };
}

export const asyncCreateNews = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: CREATE_NEWS, payload, resolve }));
