const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlPages = require("./htmlweback.config")(false);

const plugins = [
  new MiniCssExtractPlugin(),

  // Make sure this is last as
  // we're going to add more instances
  // for other pages
  new HtmlWebpackPlugin({
    template: "./src/index.html",
    chunks: ["index"],
  }),
].concat(htmlPages);

module.exports = {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8080,
  },
  plugins,
  entry: {
    index: "./src/index.js",
    about: "/src/pages/about/about.js",
  },
  module: {
    rules: [
      {
        // SCSS
        test: /\.(s[ac]|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },

  devtool: "source-map",
};
