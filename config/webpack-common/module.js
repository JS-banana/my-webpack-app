//模块配置
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { isDev } = require("../constants");

module.exports = {
  rules: [
    // less、css、style
    {
      test: /\.css$/,
      use: [
        {
          loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader, // 生产环境不用 style-loader
        },
        {
          loader: "css-loader",
        },
      ],
    },
    {
      test: /\.less$/,
      use: [
        {
          loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader,
        },
        {
          loader: "css-loader",
        },
        {
          loader: "less-loader", // 将 Less 文件编译为 CSS 文件
          // less和less-loader 版本问题 https://github.com/ant-design/ant-design/issues/7927
          options: { javascriptEnabled: true },
        },
      ],
    },
  ],
};
