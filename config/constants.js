const path = require("path");

const isDev = process.env.NODE_ENV !== "production";
const PROJECT_PATH = path.resolve(__dirname, "../");

module.exports = {
  // 开发环境
  isDev,
  // 项目路径
  PROJECT_PATH,
  // 是否开启 bundle 包分析， npm run build 触发
  shouldOpenAnalyzer: false,
  // 是否开启 esbuild 编译
  shouldEsbuild: true,
  // 是否开启 gzip 压缩 只在生产环境生效
  shouldGzip: true,
  // 开启 hash (取 webpack hash前8位)  只在生产环境生效
  // js 默认为 hash ，css 默认为 contenthash
  hash: true,
};
