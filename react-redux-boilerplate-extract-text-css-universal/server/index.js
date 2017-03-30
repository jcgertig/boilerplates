/* eslint-disable global-require, import/no-extraneous-dependencies, no-console */

import React from 'react';
import path from 'path';
import emojic from 'emojic';
import colorIt from 'color-it';
import express from 'express';
import compress from 'compression';
import ejs from 'ejs';
import ReactDOMServer from 'react-dom/server';
import configureStore from '../src/lib/store/configure';
import initialState from '../src/lib/store/default';

export default function () {
  const app = express();
  const PORT = process.env.NODE_ENV !== 'production' ? 4000 : (process.env.PORT || 4000);

  const green = txt => colorIt(txt).green();
  const red = txt => colorIt(txt).red();
  const blue = txt => colorIt(txt).blue();

  app.engine('ejs', ejs.__express); // eslint-disable-line no-underscore-dangle
  app.set('view engine', 'ejs');

  app.use(compress());
  app.use('/public', express.static(path.join(__dirname, '..', 'public')));
  app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

  let compiler;

  if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const config = require('../config/webpack.config.js');

    compiler = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
    }));

    app.use(require('webpack-hot-middleware')(compiler));

    app.set('views', path.join(__dirname, '..', 'dist'));

    app.get('*', (req, res) => {
      res.render('index', {
        state: JSON.stringify(initialState).replace(/</g, '\\x3c'),
        app: '',
      });
    });
  } else {
    const AppEntry = require('../src/views/AppEntry').default;
    app.set('views', path.join(__dirname));

    app.use((req, res) => {
      const initalStore = configureStore(initialState);
      const context = {};

      const container = (
        <AppEntry
          server={{ context, location: req.url }}
          store={initalStore}
        />
      );

      require('./initalFetch').default(container, initalStore, req.url)
        .then(({ RootComponent, store }) => {
          if (context.url) {
            res.status(301).set({
              Location: context.url,
            }).end();
          } else {
            const renderedApp = ReactDOMServer.renderToString(RootComponent);
            res.render('index', {
              state: JSON.stringify(store.getState()).replace(/</g, '\\x3c'),
              app: renderedApp,
            });
          }
        })
        .catch((err) => {
          console.log('ERROR', err);
          res.status(500).send(err);
        });
    });
  }

  app.listen(PORT, (err) => {
    if (err) {
      console.log(`${red(emojic.x)} ${red(JSON.stringify(err))}`);
      return;
    }

    const msg = `${green(emojic.smiley)}${green('  Server listening at http://localhost:')}${blue(PORT)}${green('.')}`;
    console.log(msg);
  });
}
