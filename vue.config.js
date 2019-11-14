const path = require("path");
const fs = require('fs')
const glob = require('glob-all');
const PurgecssPlugin = require('purgecss-webpack-plugin');

module.exports = {
  configureWebpack: {
    module: {
        rules: [
          {
            test: /\.pug$/,
            loader: "pug-plain-loader",
          },
          // {
          //   test: /\.scss$/,
          //   use: [
          //     'vue-style-loader',
          //     'css-loader',
          //     {
          //       loader: 'sass-loader',
          //       options: {
          //         // prependData: fs.readFileSync(path.resolve(__dirname, './src/styles/_global.scss'))
          //       }
          //     }
          //   ]
          // }
        ]
    },
    plugins: [
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, "src/**/*.ts"),
          path.join(__dirname, "src/**/*.vue")
        ]),
        minimize: true,
        purifyOptions: {
          whitelist: []
        }
      })
    ]
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/styles/_global.scss')
      ]
    }
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true
  }
};