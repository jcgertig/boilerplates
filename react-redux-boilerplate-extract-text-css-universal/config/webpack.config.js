const webpackMerge = require('webpack-merge');
const emojic = require('emojic');
const colorIt = require('color-it');
const base = require('./webpack.base.js');

const precss = require('precss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const styleVars = require('../src/globalStyleVars');

const postCss = {
  loader: 'postcss-loader',
  options: {
    plugins: ctx => [
      postcssImport({
        addDependencyTo: ctx.webpack,
      }),
      precss({
        variables: { variables: styleVars },
      }),
      autoprefixer,
    ],
  },
};

const gray = txt => colorIt(txt).gray();
const blue = txt => colorIt(txt).blue();

const API_BASE = {
  development: 'http://localhost:3000/api',
  production: process.env.API_BASE || 'http://localhost:3000/api',
};

const STORAGE_PREFIX = {
  development: '@my-app-dev',
  production: '@my-app-prod',
};

const ENV = process.env.NODE_ENV;
const LOC = process.env.NODE_SIDE;

// eslint-disable-next-line import/no-dynamic-require
const config = webpackMerge(base(LOC), require(`./webpack.${ENV}.js`)(API_BASE[ENV], STORAGE_PREFIX[ENV], postCss, LOC));

if (LOC === 'client') {
  let msg = `${gray(emojic.greyExclamation)}${gray('  Webpack running in ')}${blue(ENV)}${gray(' mode.')}`;
  console.log(msg); // eslint-disable-line

  msg = `${gray(emojic.greyExclamation)}${colorIt('  Setting api base to ').gray()}${blue(API_BASE[ENV])}${gray('.')}`;
  console.log(msg); // eslint-disable-line
} else {
  const msg = `${gray(emojic.greyExclamation)}${gray('  Server ready.')}`;
  console.log(msg); // eslint-disable-line
}

module.exports = config;
