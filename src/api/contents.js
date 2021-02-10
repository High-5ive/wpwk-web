import { createInstance } from './index.js';

const instance = createInstance();

function createContents(param, success, fail) {
  //body값 다시 만들고 JSON 파싱하기
  let token = window.localStorage.getItem("accessToken");
  let config = {headers: { Authorization: `Bearer ${token}` }};
  instance
    .post(`contents`, param, config)
    .then(success)
    .catch(fail);
}

function createTags(id, param, success, fail) {
  instance
    .post(`tags/contents/${id}`, param)
    .then(success)
    .catch(fail);
}

function findAllContents(success, fail) {
  instance
    .get('contents')
    .then(success)
    .catch(fail);
}

function findContentsById(id, success, fail) {
  instance
    .get(`contents/${id}`)
    .then(success)
    .catch(fail);
}

function findContentsByPage(page, success, fail) {
  instance
    .get(`contents/page/${page}`)
    .then(success)
    .catch(fail);
}

function findContentsByTag(tag, page, success, fail) {
  instance
    .get(`contents/tags/${tag}/page/${page}`)
    .then(success)
    .catch(fail);
}

export { createContents, createTags, findAllContents, 
  findContentsById, findContentsByPage, findContentsByTag };
