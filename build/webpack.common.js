const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const dev = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    // 入口
    app: "./src/app.js",
  },
  module: {
    rules: [
      {
        // 如果是js 文件 通过 babel 转成可以识别的对象
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" },
          {
            loader: "linaria/loader",
            options: {
              sourceMap: dev,
            },
          },
        ],
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // }
      // {
      //   test: /\.scss$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader']
      // }
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: dev,
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: dev,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    // 注入环境变量 dev prod test
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
    }),
    // index.html 注入 js 和 css
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"),
    }),
    // linaria 生成的 css file
    new MiniCssExtractPlugin({ filename: "[name]-[chunkhash:8].css" }),
  ],
  output: {
    filename: "[name]-[chunkhash:8].js",
    path: path.resolve(__dirname, "../dist"),
  },
};
