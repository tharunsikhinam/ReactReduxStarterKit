/**
 * Created by quikr on 7/12/16.
 */
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port = 3002;
const app = express();
const compiler = webpack(config);


//console.log(path.resolve(__dirname + '/../public'));

app.use(express.static(path.resolve(__dirname + '/../public/')));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

//first file to be sent as response
app.get('*', function(req, res) {
//console.log("reaching here  ");
  res.sendFile(path.join( __dirname, '../src/index.html'));
});


//start the server
app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
