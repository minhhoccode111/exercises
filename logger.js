const express = require('express');
const logger = require('morgan');
const app = express();

const port = 8080;
const host = '127.0.0.1';

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send(`Hello, World from: http://${host}:${port}`);
});

app.listen(8080, host, () => {
  console.log(`Hello, World from: http://${host}:${port}`);
});
