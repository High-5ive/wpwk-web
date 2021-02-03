import { createInstance } from "./index.js";

const instance = createInstance();
// const config = {
//   headers: { "access-token": localStorage.getItem("access-token") }
// };

function registerUser(user, success, fail) {
    instance
        .post(`users`, JSON.stringify(user))
        .then(success)
        .catch(fail)
}

function login(user, success, fail) {
  instance.defaults.headers["access-token"] = window.localStorage.getItem(
    "access-token"
  );
  const body = {
    email: user.email,
    password: user.password
  };

  instance
    .post("/login", JSON.stringify(body))
    .then(success)
    .catch(fail)
}

async function findById(userid, success, fail) {
  instance.defaults.headers["access-token"] = window.localStorage.getItem(
    "access-token"
  );
  await instance
    .get(`/user/info/${userid}`)
    .then(success)
    .catch(fail)
}

async function getUserInfo() {
  instance.defaults.headers["access-token"] = window.localStorage.getItem(
    "access-token"
  );
  await instance
    .post(`/loginUser`)
    .then(success)
    .catch(fail)
}



export { login, findById, registerUser, getUserInfo };
