const express = require('express');
const app = express();
const fs = require('fs');

const port = process.argv[2];

const file = process.argv[3];

app.get('/books', (req, res) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      return res.sendStatus(500);
    }
    try {
      data = JSON.parse(data);
      res.json(data);
    } catch (e) {
      res.sendStatus(500);
    }
  });
});

app.listen(port, () => {
  console.log('Hello, World!');
});
