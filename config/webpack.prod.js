const { merge } = require("webpack-merge"); // webpack 配置合并插件
const common = require("./webpack.common.js");
const CompressionPlugin = require("compression-webpack-plugin");

const productionGzipExtensions = ["js", "css"];

module.exports = merge(common, {
  // 运行模式 production / development
  mode: "production",
  devtool: "none",
  plugins: [
    // 文件压缩插件 gzip
    new CompressionPlugin({
      //asset、algorithm默认值为[path].gz[query]、gzip
      // asset: '[path].gz[query]',
      // algorithm: 'gzip',
      // filename:'',
      test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 30000,
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          // priority: 10,
        },
        antdUI: {
          name: "chunk-antdUI",
          test: /[\\/]node_modules[\\/]_?antd(.*)/,
          chunks: "all",
          // priority: 20,
        },
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
        },
        commons: {
          name: "async-commons",
          chunks: "async",
          minChunks: 2,
        },
      },
    },
  },
});
