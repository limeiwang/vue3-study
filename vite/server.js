const fs = require("fs");
const path = require("path");
const Koa = require("koa");
const compilerSfc = require("@vue/compiler-sfc"); // .vue
const compilerDom = require("@vue/compiler-dom"); // 模板
// jsx解析
const app = new Koa();

app.use();

app.listen(8888, () => {
  console.log("success listen 8888");
});
