import axios from "axios";

const url = {
  baseUrl: "https://61e16e8e63f8fc0017618bf7.mockapi.io/",
  r2s: "/r2s",
  login: "http://quanlycudan.modunsoft.com/api/Users/authenticate",
};

const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    Accept: "application/json",
  },
});

const api = {
  url,
  instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};

export default api;
