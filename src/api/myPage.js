import { instance } from './index.js';

// const instance = createInstance();
// const config = {
//   headers: { "access-token": localStorage.getItem("access-token") }
// };

function findMyContents(page, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = { headers: { Authorization: `Bearer ${token}` } };

  instance
    .get(`mypage/contents/page/${page}`, config)
    .then(success)
    .catch(fail);
}

function findMyBoard(page, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = { headers: { Authorization: `Bearer ${token}` } };

  instance
    .get(`mypage/board/page/${page}`, config)
    .then(success)
    .catch(fail);
}

function findContentsByFavorite(page, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = { headers: { Authorization: `Bearer ${token}` } };

  instance
    .get(`mypage/favoriteContents/page/${page}`, config)
    .then(success)
    .catch(fail);
}

function findBoardsByComments(page, success, fail) {
  let token = window.localStorage.getItem('accessToken');
  let config = { headers: { Authorization: `Bearer ${token}` } };

  instance
    .get(`mypage/commentBoard/page/${page}`, config)
    .then(success)
    .catch(fail);
}

export {
  findMyContents,
  findMyBoard,
  findContentsByFavorite,
  findBoardsByComments,
};
