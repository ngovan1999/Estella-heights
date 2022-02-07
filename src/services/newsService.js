import axios from "axios";
import request from "../utils/request";

const BASE_API = "https://quanlycudan.azurewebsites.net/api";
export function getNewsData(params) {
  return request(`${BASE_API}/news/get-all`, {
    method: "POST",
    data: params,
  });
}

export const deleteNews = (params) => {
  return request(`${BASE_API}/News/delete/${params}`, {
    method: "post",
    data: params,
  });
};

export const createNews = (param) => {
  return request(`${BASE_API}/News/create`, {
    method: "POST",
    responseType: "form",
    data: param,
  });
};

export const getDetailNews = (id) => {
  return request(`${BASE_API}/News/get-detail/${id}`, {
    method: "POST",
    responseType: "form",
  });
};

export const updateNews = (id, params) => {
  return request(`${BASE_API}/News/update/${id}`, {
    method: "POST",
    responseType: "form",
    data: params,
  });
};
