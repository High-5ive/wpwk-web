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
    if(errors.response.status === 403) {
      if(errors.response.data === "email") {
        alert("이메일을 인증해주세요")
      } else {
        alert("해당 계정은 비활성화 되었습니다")
      }
    }

    // 세션이 만료된 경우
    else if(errors.response.status === 401) {
      store.dispatch("expired") 
    } 
    return Promise.reject(errors);
  }
)


export { instance };