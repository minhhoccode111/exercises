const express = require('express');
const app = express();

const parser = require('body-parser');

app.use(parser.urlencoded({ extended: false }));

const port = process.argv[2];

app.post('/form', (req, res) => {
  res.end(req.body.str.split('').reverse().join(''));
});

app.listen(port, () => {
  //
});
