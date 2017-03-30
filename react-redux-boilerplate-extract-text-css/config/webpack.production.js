const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = require('html-webpack-template');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function production(apiBase, storagePrefix, postCss) {
  return {
    entry: '../src/index.js',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?&importLoaders=1',
              postCss,
            ],
          }),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[id].style.css',
        allChunks: false,
      }),

      new HtmlWebpackPlugin({
        template,
        title: 'My React App Prod',
        filename: 'index.html',
        mobile: true,
        devServer: false,
        devMiddleware: true,
        appMountId: 'root',
        window: {
          STORAGE_PREFIX: storagePrefix,
          API_BASE: apiBase,
        },
      }),

      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true,
        },
        compress: {
          screw_ie8: true,
        },
        comments: false,
      }),
    ],
  };
};
