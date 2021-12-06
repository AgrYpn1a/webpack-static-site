const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPages = require('./config/htmlwebpack.config')(false);
const entries = require('./config/entries.json');

const plugins = [
  new MiniCssExtractPlugin(),

  // Make sure this is last as
  // we're going to add more instances
  // for other pages
  new HtmlWebpackPlugin({
    template: './src/index/index.html',
    chunks: ['index'],
  }),
].concat(htmlPages);

module.exports = {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: {
        ignored: /node_modules/,
        usePolling: false,
        watchFiles: ['./src/**/*.html', './src/**/*.scss', './src/**/*.js'],
      },
    },
    compress: true,
    port: 8080,
  },
  plugins,
  entry: entries,
  module: {
    rules: [
      {
        // SCSS
        test: /\.(s[ac]|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  devtool: 'source-map',
};
