import { createInstance } from './index.js';

const instance = createInstance();

function checkEmailAuthReq(uid, verificationKey, success, fail) {
  instance
    .get(`users/confirm?uid=` + uid + `&verificationKey=` + verificationKey)
    .then(success)
    .catch(fail);
}

export {
    checkEmailAuthReq,
};