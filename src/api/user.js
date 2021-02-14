import {
  instance
} from './index.js';

// const config = {
//   headers: { "access-token": localStorage.getItem("access-token") }
// };

function registerUser(user, success, fail) {
  instance
    .post(`users`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

function login(user, success, fail) {
  const body = {
    email: user.email,
    password: user.password,
  };

  instance
    .post(`login`, JSON.stringify(body))
    .then(success)
    .catch(fail);
}

function getUserInfo(targetUser, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
  instance
    .get(`users/${targetUser.targetId}`, config)
    .then(success)
    .catch(fail)
}

function follow(userId, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
  instance
    .post(`users/following`, userId, config)
    .then(success)
    .catch(fail)
}

function changePwd(param, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  instance
    .put(`users/changePassword`, param, config)
    .then(success)
    .catch(fail);
}

function deleteUser(success, fail) {
  let token = window.localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  instance
    .delete(`users`, config)
    .then(success)
    .catch(fail);
}

async function findById(userId, success, fail) {
  let token = window.localStorage.getItem('accessToken');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await instance
    .get(`loginUser/${userId}`, config)
    .then(success)
    .catch(fail);
}

function naverLogin(token, success, fail) {
  instance
    .get(`login/process/naver/` + token)
    .then(success)
    .catch(fail);
}

function kakaoLogin(code, success, fail) {
  instance
    .get(`kakao/` + code)
    .then(success)
    .catch(fail);
}

function contentsEvaluations(data, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  instance
    .put(`users/contentsEnd`, data, config)
    .then(success)
    .catch(fail);
}

export {
  login,
  findById,
  registerUser,
  naverLogin,
  kakaoLogin,
  deleteUser,
  changePwd,
  getUserInfo,
  follow,
  contentsEvaluations,
};