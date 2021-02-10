"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAllBoards = findAllBoards;
exports.updateLikes = updateLikes;

var _index = require("./index.js");

var instance = (0, _index.createInstance)(); // 커뮤니티 내 모든 게시글(Board)를 조회

function findAllBoards(success, fail) {
  instance.get('boards').then(success)["catch"](fail);
} // 좋아요 올리기


function updateLikes(id, val, success, fail) {
  var body = {
    likes: val
  };
  instance.put("boards/".concat(id, "/likes"), body).then(success)["catch"](fail);
}