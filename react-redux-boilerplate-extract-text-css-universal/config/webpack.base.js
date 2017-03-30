const { resolve } = require('path');
const webpack = require('webpack');

module.exports = function base(location) {
  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
      minChunks: 3,
    }),
  ];

  if (location === 'client') {
    plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }));
  }

  return {
    output: {
      filename: 'bundle.js',
      // the output bundle

      path: resolve(__dirname, '../dist'),

      publicPath: '/dist/',
      // necessary for HMR to know where to load the hot update chunks
    },

    resolve: {
      modules: [
        'node_modules',
        'src',
      ],
      alias: {
        components: resolve(__dirname, '../src/components'),
        reducers: resolve(__dirname, '../src/reducers'),
        actions: resolve(__dirname, '../src/actions'),
        views: resolve(__dirname, '../src/views'),
        lib: resolve(__dirname, '../src/lib'),
      },
    },

    context: resolve(__dirname),

    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            'babel-loader',
          ],
          exclude: /(node_modules|dist-server)/,
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            'file-loader',
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          use: [
            'url-loader?limit=100000',
          ],
        },
        {
          test: /\.json$/,
          use: [
            'json-loader',
          ],
        },
      ],
    },
    plugins,
  };
};
