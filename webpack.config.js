const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "sass-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        exclude: /node_modules/,
      },
      {
        test: /\.(tsx|ts)$/i,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    //尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀
    extensions: [".tsx", ".ts", ".js"],
    // 设置引用别名
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        collapseWhitespace: true, //删除空格、换行
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  devServer: {
    static: "./dist",
    port: 8000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  // 忽略一些不需要监听的庞大文件，比如 node_modules，可以优化性能。
  watchOptions: {
    ignored: /node_modules/,
  },
  devtool: "inline-source-map",
};
