// 通用基础配置
const { resolve } = require("path");
const { isDev, PROJECT_PATH } = require("./constants");
const module_config = require("./webpack-common/module.js");
const plugins_config = require("./webpack-common/plugins.js");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  // 入口文件
  entry: {
    app: resolve(PROJECT_PATH, "./src/index.jsx"),
  },
  // 出口 输出文件
  output: {
    path: resolve(PROJECT_PATH, "./dist"),
    filename: `js/[name]${isDev ? "" : ".[hash:8]"}.js`,
  },
  // 模块
  module: module_config,
  // 插件
  plugins: plugins_config,
  // 分包
  optimization: {
    minimize: !isDev,
    minimizer: [
      // 压缩 js 插件 https://www.npmjs.com/package/terser-webpack-plugin
      !isDev &&
        new TerserPlugin({
          extractComments: false, // 启用/禁用 提取注释
          terserOptions: {
            // pure_funcs： 可以安全删除那些返回无用值的（return values are not used）
            // https://github.com/terser/terser#minify-options
            compress: { pure_funcs: ["console.log"] },
          },
        }),
      // 压缩 css 插件
      !isDev && new OptimizeCssAssetsPlugin(),
    ].filter(Boolean),
    splitChunks: {
      chunks: "all",
      name: true,
    },
  },
};
