import { createInstance } from './index.js';

const instance = createInstance();

function createContents(param, config, success, fail) {
  //body값 다시 만들고 JSON 파싱하기
  instance.defaults.headers['Authorization'] = config;
  instance
    .post('/contents', JSON.stringify(param))
    .then(success)
    .catch(fail);
}

function createTags(id, param, success, fail) {
  instance
    .post(`/tags/contents/${id}`, param)
    .then(success)
    .catch(fail);
}

export { createContents, createTags };
