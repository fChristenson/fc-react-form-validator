const path = require("path");

module.exports = {
  entry: path.join(__dirname, "examples", "main.js"),
  output: {
    path: path.join(__dirname, "examples"),
    filename: "bundle.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["babel-preset-react"]
        }
      }
    ]
  }
};
