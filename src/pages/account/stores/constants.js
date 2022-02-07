const NS_ACCOUNT = "account";
const NS_RESIDENT = "resident";
const SET_LOADING = `${NS_ACCOUNT}/setLoading`;
const SAVE_LOADING = `${NS_ACCOUNT}/saveLoading`;

const GET_ALL_ACCOUNT = `${NS_ACCOUNT}/getAllAccount`;

const SAVE_ALL_ACCOUNT = `${NS_ACCOUNT}/saveAllAccount`;

const CHANGE_ACCOUNT_REQUEST = `${NS_ACCOUNT}/changeAccountRequest`;

const GET_ALL_USER = `${NS_RESIDENT}/getAllUser`;
const SAVE_ALL_USER = `${NS_RESIDENT}/saveAllUser`;

const CREAT_USER_RESIDENT = `${NS_RESIDENT}/createUserResident`;

export {
  SET_LOADING,
  SAVE_LOADING,
  GET_ALL_ACCOUNT,
  SAVE_ALL_ACCOUNT,
  CHANGE_ACCOUNT_REQUEST,
  GET_ALL_USER,
  SAVE_ALL_USER,
  CREAT_USER_RESIDENT,
};
