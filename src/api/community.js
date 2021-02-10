import {
  createInstance
} from './index.js';

const instance = createInstance();

// 커뮤니티 내 모든 게시글(Board)를 조회
function findAllBoards(success, fail) {
  instance
    .get('boards')
    .then(success)
    .catch(fail);
}

// 좋아요 올리기
function updateLikes(id, val, success, fail) {
  const body = {
    likes: val,
  }

  instance
    .put(`boards/${id}/likes`, body)
    .then(success)
    .catch(fail);
}

export {
  findAllBoards,
  updateLikes,
};