import request from "../utils/request";

const BASE_URL = "https://quanlycudan.azurewebsites.net/api";

export function changePassRequestService(params) {
  return request(`${BASE_URL}/Users/change-password`, {
    method: "POST",
    data: params,
  });
}

export const getAllUserRequest = (params) => {
  return request(`${BASE_URL}/Residence/get-all-users`, {
    method: "post",
    data: params,
  });
};

export const createUserResidentRequest = (params) => {
  return request(`${BASE_URL}/Residence/create-user`, {
    method: "post",
    data: params,
  });
};

export const getAllUser = (params) => {
  return request(`${BASE_URL}/get-all/All`, {
    method: "post",
    data: params,
  });
};

export const getAllUserManager = (params) => {
  return request(`${BASE_URL}/users/get-all/${params.url}`, {
    method: "post",
    data: params.payload,
  });
};

export const createUserManager = (payload) => {
  console.log(payload);
  return request(`${BASE_URL}/users/create`, {
    method: "post",
    data: payload,
  });
};

export const deleteUserManager = (params) => {
  console.log(params);
  return request(`${BASE_URL}/users/delete/${params}`, {
    method: "post",
    data: params,
  });
};
