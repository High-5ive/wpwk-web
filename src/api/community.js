import { instance } from "./index.js";

function createBoard(data, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .post(`boards`, data, config)
    .then(success)
    .catch(fail);
}

// 커뮤니티 내 모든 게시글(Board)를 조회
function findAllBoards(success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .get(`boards`, config)
    .then(success)
    .catch(fail);
}

// 아이디를 이용한 게시글 조회
function findBoardsById(id, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .get(`boards/${id}`, config)
    .then(success)
    .catch(fail);
}

// 게시글 조회
function findBoardsByPage(page, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .get(`boards/page/${page}`, config)
    .then(success)
    .catch(fail);
}

// 주제별 게시글 조회
function findBoardsByCategory(category, page, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .get(`boards/category/${category}/page/${page}`, config)
    .then(success)
    .catch(fail);
}

// 좋아요 올리기
function updateLikes(id, params, success, fail) {
  let token = window.localStorage.getItem("accessToken");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  instance
    .put(`boards/${id}/likes`, JSON.stringify(params), config)
    .then(success)
    .catch(fail);
}

export {
  findAllBoards,
  updateLikes,
  findBoardsByPage,
  findBoardsByCategory,
  createBoard,
  findBoardsById,
};
