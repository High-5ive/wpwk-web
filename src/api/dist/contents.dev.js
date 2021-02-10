"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContents = createContents;
exports.createTags = createTags;
exports.findAllContents = findAllContents;
exports.findContentsById = findContentsById;
exports.findContentsByPage = findContentsByPage;
exports.findContentsByTag = findContentsByTag;

var _index = require("./index.js");

var instance = (0, _index.createInstance)();

function createContents(param, success, fail) {
  //body값 다시 만들고 JSON 파싱하기
  var token = window.localStorage.getItem("accessToken");
  var config = {
    headers: {
      Authorization: "Bearer ".concat(token)
    }
  };
  instance.post('contents', JSON.stringify(param), config).then(success)["catch"](fail);
}

function createTags(id, param, success, fail) {
  instance.post("tags/contents/".concat(id), param).then(success)["catch"](fail);
}

function findAllContents(success, fail) {
  instance.get('contents').then(success)["catch"](fail);
}

function findContentsById(id, success, fail) {
  instance.get("contents/".concat(id)).then(success)["catch"](fail);
}

function findContentsByPage(page, success, fail) {
  instance.get("contents/page/".concat(page)).then(success)["catch"](fail);
}

function findContentsByTag(tag, page, success, fail) {
  instance.get("contents/tags/".concat(tag, "/page/").concat(page)).then(success)["catch"](fail);
}