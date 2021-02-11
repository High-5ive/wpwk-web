import { instance } from './index.js';


function createContents(param, success, fail) {
  //body값 다시 만들고 JSON 파싱하기
  let token = window.localStorage.getItem("accessToken");
  let config = {headers: { Authorization: `Bearer ${token}` }};
  instance
    .post(`contents`, param, config)
    .then(success)
    .catch(fail)
}

function createTags(id, param, success, fail) {
  instance
    .post(`tags/contents/${id}`, param)
    .then(success)
    .catch(fail);
}

function findAllContents(success, fail) {

  let token = window.localStorage.getItem("accessToken");
  let config = {headers: { Authorization: `Bearer ${token}` }};

  instance
    .get(`contents`, config)
    .then(success)
    .catch(fail);
}

function findContentsById(id, success, fail) {

  let token = window.localStorage.getItem("accessToken");
  let config = {headers: { Authorization: `Bearer ${token}` }};

  instance
    .get(`contents/${id}`, config)
    .then(success)
    .catch(fail);
}

function findContentsItemById(id, success, fail) {
  instance
    .get(`/contentsItem/${id}`)
    .then(success)
    .catch(fail);
}

function findContentsByPage(page, success, fail) {
  
  let token = window.localStorage.getItem("accessToken");
  let config = {headers: { Authorization: `Bearer ${token}` }};

  instance
    .get(`contents/page/${page}`, config)
    .then(success)
    .catch(fail);
}

function findContentsByTag(tag, page, success, fail) {

  let token = window.localStorage.getItem("accessToken");
  let config = {headers: { Authorization: `Bearer ${token}` }};

  instance
    .get(`contents/tags/${tag}/page/${page}`, config)
    .then(success)
    .catch(fail);
}

function favoriteContents(id, success, fail) {

  let token = window.localStorage.getItem("accessToken");
  let config = {headers: { Authorization: `Bearer ${token}` }};

  instance
    .post(`contents/favorite`, id, config)
    .then(success)
    .catch(fail);
}

function unFavoriteContents(id, success, fail) {

  let token = window.localStorage.getItem("accessToken");
  let config = {headers: { Authorization: `Bearer ${token}` }};

  instance
    .delete(`contents/favorite/${id}`, config)
    .then(success)
    .catch(fail);
}
export {
  createContents,
  createTags,
  findAllContents,
  findContentsById,
  findContentsByPage,
  findContentsByTag,
  findContentsItemById,
  favoriteContents,
  unFavoriteContents,
};
