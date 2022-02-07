import request from "../utils/request";

const BASE_API = "https://quanlycudan.azurewebsites.net/api/services";
export function getListService(params) {
  return request(`${BASE_API}/get-all`, {
    method: "POST",
    data: params,
  });
}

export const createServiceRequest = (params) => {
  return request(`${BASE_API}/create`, {
    method: "POST",
    data: params,
  });
};

export const deleteRequest = (params) => {
  return request(`${BASE_API}/delete/${params}`, {
    method: "POST",
    data: params,
  });
};
