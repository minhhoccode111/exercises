const express = require('express');
const app = express();

const port = process.argv[2];

app.get('/search', (req, res) => {
  res.json(req.query);
});

app.listen(port, () => {
  console.log('tai vi sao');
});
