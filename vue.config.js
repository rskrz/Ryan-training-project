const path = require("path");

const PurifyCSSPlugin = require("purifycss-webpack");
const glob = require("glob-all");

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: "pug-plain-loader"
        }
      ]
    },
    plugins: [
      new PurifyCSSPlugin({
        paths: glob.sync([
          path.join(__dirname, "src/*.html"),
          path.join(__dirname, "src/*.js")
        ]),
        minimize: true,
        purifyOptions: {
          whitelist: []
        }
      })
    ]
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/styles/_global.scss")]
    }
  },
  devServer: {
    host: "0.0.0.0",
    disableHostCheck: true
  }
};
