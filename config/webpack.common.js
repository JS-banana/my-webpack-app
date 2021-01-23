// 通用基础配置
const { resolve } = require("path");
const { isDev, PROJECT_PATH, shouldEsbuild, hash } = require("./constants");
const module_config = require("./webpack-common/module.js");
const plugins_config = require("./webpack-common/plugins.js");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// https://github.com/privatenumber/esbuild-loader
const { ESBuildPlugin, ESBuildMinifyPlugin } = require("esbuild-loader");

// module
const moduleSetting = {
  rules: [
    ...module_config.rules,
    // js、jsx、tsx
    shouldEsbuild
      ? {
          test: /\.(js|jsx)$/,
          loader: "esbuild-loader",
          options: {
            loader: "jsx", // Remove this if you're not using JSX
            target: "es2015", // Syntax to compile to (see options below for possible values)
          },
        }
      : {
          test: /\.(js|jsx|tsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            // presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
  ],
};

// plugins
const pluginsSetting = [
  ...plugins_config,
  shouldEsbuild && new ESBuildPlugin(),
].filter(Boolean);

// minimizer
const minimizer = [
  shouldEsbuild &&
    new ESBuildMinifyPlugin({
      target: "es2015", // Syntax to compile to (see options below for possible values)
    }),
  !shouldEsbuild &&
    new TerserPlugin({
      extractComments: false, // 启用/禁用 提取注释
      terserOptions: {
        // pure_funcs： 可以安全删除那些返回无用值的（return values are not used）
        // https://github.com/terser/terser#minify-options
        compress: { pure_funcs: ["console.log"] },
      },
    }),
  !!shouldEsbuild && new OptimizeCssAssetsPlugin(),
].filter(Boolean);

module.exports = {
  // 入口文件
  entry: {
    app: resolve(PROJECT_PATH, "./src/index.jsx"),
  },
  // 出口 输出文件
  output: {
    path: resolve(PROJECT_PATH, "./dist"),
    filename: `js/[name]${!isDev && hash ? ".[hash:8]" : ""}.js`,
  },
  // 模块
  module: moduleSetting,
  // 插件
  plugins: pluginsSetting,
  // 分包
  optimization: {
    minimize: !isDev,
    minimizer,
    splitChunks: {
      chunks: "all",
      name: true,
    },
  },
};
