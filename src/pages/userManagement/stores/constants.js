const NS_ACCOUNT = "account";

const NS_USER_MANAGER = "userManager";

const SET_LOADING = `${NS_ACCOUNT}/setLoading`;
const SAVE_LOADING = `${NS_ACCOUNT}/saveLoading`;

const GET_ALL_USER_ACCOUNT = `${NS_USER_MANAGER}/getAllUserAccount`;

const SAVE_ALL_USER_ACCOUNT = `${NS_USER_MANAGER}/saveAllUserAccount`;

const DELETE_USER_SUCCESS = `${NS_USER_MANAGER}/deleteUserAccount`;
const CREATE_USER_REQUEST = `${NS_USER_MANAGER}/createUserAccount`;

export {
  SET_LOADING,
  SAVE_LOADING,
  GET_ALL_USER_ACCOUNT,
  SAVE_ALL_USER_ACCOUNT,
  CREATE_USER_REQUEST,
  DELETE_USER_SUCCESS
};
