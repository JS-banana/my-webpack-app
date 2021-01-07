// 开发环境配置
const { merge } = require("webpack-merge"); // webpack 配置合并插件
const common = require("./webpack.common.js");

module.exports = merge(common, {
  // 运行模式 production / development
  mode: "development",
  devtool: "eval-source-map",
});
