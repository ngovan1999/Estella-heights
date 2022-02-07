import axios from "axios";
import request from "../utils/request";

const BASE_API = "https://quanlycudan.azurewebsites.net/api/services";
export function getListBooking(params) {
  return request(`${BASE_API}/get-all-booking`, {
    method: "POST",
    data: params,
  });
}
