const express = require('express');

const { createHash } = require('crypto');

const app = express();

const port = process.argv[2];

app.put('/message/:id', (req, res) => {
  const id = req.params.id;

  res.end(
    createHash('sha1')
      .update(new Date().toDateString() + id)
      .digest('hex')
  );
});

app.listen(port, () => {
  console.log('');
});
