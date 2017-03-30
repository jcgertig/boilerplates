const universalWebpack = require('universal-webpack');
const settings = require('./universal-webpack-settings.json');
const configuration = require('./webpack.config');

module.exports = universalWebpack.clientConfiguration(configuration, settings);
