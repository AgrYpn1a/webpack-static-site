/** Configures the html pages */
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (preserveDirs = false) => {
  const htmlPages = ["about"];
  const htmlWebpackPages = htmlPages.map((name) => {
    return new HtmlWebpackPlugin({
      filename: preserveDirs ? `${name}/${name}.html` : `${name}.html`, // output HTML files
      template: `./src/pages/${name}/${name}.html`, // relative path to the HTML files
      chunks: [`${name}`], // respective JS files
    });
  });

  return htmlWebpackPages;
};
