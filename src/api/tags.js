import { createInstance } from './index.js';

const instance = createInstance();

function recommendTags(tag, success, fail) {
  instance
    .post(`/tags/search`, tag)
    .then(success)
    .catch(fail);
}

export {
  recommendTags,
};