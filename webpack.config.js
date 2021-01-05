const path = require("path");

module.exports = {
  // 入口文件
  entry: "./src/index.js",
  // 输出文件
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "/dist/",
  },
  // 运行模式 production / development
  mode: "production",
  // 模块
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: "babel-loader",
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
    ],
  },
};
