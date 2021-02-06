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
  const body = {
    email: user.email,
    password: user.password
  };

  instance
    .post(`login`, JSON.stringify(body))
    .then(success)
    .catch(fail)
}

async function findById(userId, success, fail) {
  let token = window.localStorage.getItem("accessToken");    
  
  const config = {headers: { Authorization: `Bearer ${token}` }};
  await instance
    .get(`loginUser/${userId}`, config)
    .then(success)
    .catch(fail);
}



export { login, findById, registerUser };
