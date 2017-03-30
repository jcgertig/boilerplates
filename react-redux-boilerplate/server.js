const path = require('path');
const emojic = require('emojic');
const colorIt = require('color-it');
const express = require('express');
const compress = require('compression');

const app = express();
const PORT = process.env.NODE_ENV !== 'production' ? 4000 : process.env.PORT || 4000;

const green = txt => colorIt(txt).green();
const red = txt => colorIt(txt).red();
const blue = txt => colorIt(txt).blue();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const config = require('./config/webpack.config.js');

  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.get('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) { return next(err); }
      res.set('content-type', 'text/html');
      res.send(result);
      return res.end();
    });
  });
} else {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.use(compress());
app.use('/public', express.static('public'));
app.use('/dist', express.static('dist'));

app.listen(PORT, (err) => {
  if (err) {
    console.log(`${red(emojic.x)}  ${red(JSON.stringify(err))}`); // eslint-disable-line no-console
    return;
  }

  const msg = `${green(emojic.smiley)}${green('  Listening at http://localhost:')}${blue(PORT)}${green('.')}`;
  console.log(msg); // eslint-disable-line no-console
});
