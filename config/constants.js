const path = require("path");

const isDev = process.env.NODE_ENV !== "production";
const PROJECT_PATH = path.resolve(__dirname, "../");
// 是否开启 bundle 包分析
const shouldOpenAnalyzer = true;

module.exports = {
  isDev,
  PROJECT_PATH,
  shouldOpenAnalyzer,
};
