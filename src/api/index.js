import axios from "axios";
import { API_BASE_URL } from "../config";
import store from "@/store/store"

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(errors) {

    // TODO: 권한이 없는 경우(구현 예정)
    if(errors.response.status === 401) {
      console.log("권한이 없습니다");
    }

    // 세션이 만료된 경우
    if(errors.response.status === 403) {
      store.dispatch("expired") 
    }
    return Promise.reject(errors);
  }
)


export { instance };