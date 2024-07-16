const express = require('express');

const path = require('path');

const app = express();

const port = process.argv[2];

const file = process.argv[3];

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'templates'));

app.get('/home', (req, res) => {
  res.render(file, { date: new Date().toDateString() });
});

app.listen(port, () => {
  //
});
