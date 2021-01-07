// bable 编译器

module.exports = {
  presets: [
    // jsx 编译器 https://www.babeljs.cn/docs/babel-preset-react
    [
      "@babel/preset-react",
      // {
      //   development: process.env.BABEL_ENV === "development",
      // },
    ],
    // ES6 ES7 编译器 https://www.babeljs.cn/docs/babel-preset-env
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true,
        },
      },
    ],
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "antd",
        style: true,
      },
    ],
  ],
};
