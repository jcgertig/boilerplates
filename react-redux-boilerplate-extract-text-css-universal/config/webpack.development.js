const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin'); // eslint-disable-line
const template = require('html-webpack-template-react');


module.exports = function development(apiBase, storagePrefix, postCss, location) {
  const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors
  ];

  if (location === 'client') {
    plugins.push(new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template,
      title: 'My React App Dev',
      filename: 'index.ejs',
      mobile: true,
      devServer: false,
      devMiddleware: true,
      appMountId: 'root',
      window: {
        STORAGE_PREFIX: storagePrefix,
        API_BASE: apiBase,
      },
      links: [
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/hint.css/2.2.1/hint.min.css',
      ],
    }));
    plugins.push(new HtmlWebpackHarddiskPlugin());
  }

  return {
    entry: [
      'react-hot-loader/patch',
      // activate HMR for React

      'eventsource-polyfill',
      // necessary for hot reloading with IE

      'webpack-hot-middleware/client',
      // listen to code updates emitted by hot middleware

      '../src/index.js',
      // the entry point of our app
    ],

    devtool: 'inline-source-map',

    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader?&importLoaders=1',
            postCss,
          ],
        },
      ],
    },

    plugins,
  };
};
