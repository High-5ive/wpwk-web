import {
  createInstance
} from './index.js';

const instance = createInstance();

// 커뮤니티 내 모든 게시글(Board)를 조회
function findAllBoards(success, fail) {

  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  instance
    .get(`boards`, config)
    .then(success)
    .catch(fail);
}

// 좋아요 올리기
function updateLikes(id, params, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  instance
    .put(`boards/${id}/likes`, JSON.stringify(params), config)
    .then(success)
    .catch(fail);
}

export {
  findAllBoards,
  updateLikes,
};