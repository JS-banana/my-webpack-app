const webpack = require("webpack");
const { resolve } = require("path");
const glob = require("glob");
const {
  isDev,
  PROJECT_PATH,
  shouldOpenAnalyzer,
  hash,
} = require("../constants");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBar = require("webpackbar");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
  // 清除文件缓存
  !isDev && new CleanWebpackPlugin(),
  // html 文件处理插件
  new HtmlWebpackPlugin({
    title: "webpack title auto name",
    template: resolve(PROJECT_PATH, "./public/index.html"),
    filename: "index.html",
    cache: false,
    minify: isDev
      ? false
      : {
          removeAttributeQuotes: true, // 尽可能删除属性周围的引号
          collapseWhitespace: true, // 空格、换行
          removeComments: true, // 删除HTML注释
          collapseBooleanAttributes: true, // 从布尔属性中省略属性值
          collapseInlineTagWhitespace: true, // 删除内敛元素display:inline之间的空格
          removeRedundantAttributes: true, // 当值匹配默认值时删除属性。
          removeScriptTypeAttributes: true, // 从脚本标签中删除type =“ text / javascript”。其他类型属性值保持不变
          removeStyleLinkTypeAttributes: true, // 从脚本标签中删除type="text/css"
          minifyCSS: true, // 压缩css（使用 uses clean-css）
          minifyJS: true, // 压缩js（使用 Terser）
          minifyURLs: true, // 压缩URL（使用 relatedURL）
          useShortDoctype: true, // 用短（HTML5）文档类型替换文档类型
        },
  }),
  // 复制 tips:webpack4.x 使用 copy-webpack-plugin@6.x
  new CopyPlugin({
    patterns: [
      {
        context: resolve(PROJECT_PATH, "./public"),
        from: "*",
        to: resolve(PROJECT_PATH, "./dist"),
        toType: "dir",
      },
    ],
  }),
  // 进度条
  new WebpackBar({
    name: isDev ? "正在启动===>" : "正在打包===>",
    color: "#fa8c16",
  }),
  // 包依赖分析
  !isDev &&
    shouldOpenAnalyzer &&
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
      analyzerHost: "127.0.0.1",
      analyzerPort: 8888,
    }),
  // 压缩 css 生产环境抽离为单独文件
  !isDev &&
    new MiniCssExtractPlugin({
      filename: `css/[name]${hash ? ".[contenthash:8]" : ""}.css`,
      chunkFilename: `css/[name]${hash ? ".[contenthash:8]" : ""}.css`,
      ignoreOrder: false,
    }),
  // 删除无用 css
  new PurgeCSSPlugin({
    paths: glob.sync(`${resolve(PROJECT_PATH, "./src")}/**/*`, { nodir: true }),
  }),
].filter(Boolean);
