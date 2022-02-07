import axios from "axios";
import request from "../utils/request";

const BASE_API = "https://quanlycudan.azurewebsites.net/api";
export function loginRequestService(params) {
  return request(`${BASE_API}/users/authenticate`, {
    method: "POST",
    data: params,
  });
}
