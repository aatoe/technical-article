// 路由判断： 用来设置路由
const express = require("express");
const mock = require("./mock.js");

const router = express.Router();

// 设置路由
// 处理提交修改数据的路由
router.get("/", (req, res) => {
  let data = mock.project;
  res.send(data);
});
router.post("/post", (req, res) => {
  let data = mock.push_comment;
  console.log("收到请求");

  res.send(data);
});
module.exports = router;
