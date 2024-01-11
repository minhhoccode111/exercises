const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const app = express();

const host = '127.0.0.1';
const port = 8080;

// middleware to log
app.use(logger('dev'));

// custom middleware
app.use((req, res, next) => {
  console.log('Inside custom middleware');
  next();
});

// server static files in src folder, when user access /index.html we will server src/index.html file etc.
// app.use(express.static('src'));

// server static files in alias, anonymous route so that user don't know our files structure
app.use('/src', express.static('src'));

app.get('/', (req, res, next) => {
  res.send('Hello, World');
});

app.listen(port, host, () => {
  console.log(`Hello, World from http://${host}:${port}`);
});
