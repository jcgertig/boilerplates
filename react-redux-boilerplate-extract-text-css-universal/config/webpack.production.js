const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = require('html-webpack-template-react');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function production(apiBase, storagePrefix, postCss, location) {
  const plugins = [
    new ExtractTextPlugin({
      filename: '[id].style.css',
      allChunks: false,
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
  ];

  if (location === 'client') {
    plugins.push(new HtmlWebpackPlugin({
      template,
      title: 'My React App Prod',
      filename: 'index.ejs',
      mobile: true,
      devServer: false,
      devMiddleware: true,
      appMountId: 'root',
      window: {
        STORAGE_PREFIX: storagePrefix,
        API_BASE: apiBase,
      },
      scriptBlocks: [
        'Raven.config(\'https://8337ca7641e2489798a8f9c342186ce8@sentry.io/137145\').install();',
      ],
      links: [
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/hint.css/2.2.1/hint.min.css',
      ],
    }));
  }

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
    plugins,
  };
};
