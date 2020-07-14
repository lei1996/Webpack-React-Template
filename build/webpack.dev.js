const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  // 入口文件
  devServer: {
    // dev 开发模式导入public 目录下的文件
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
  },
});
