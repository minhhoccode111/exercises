// wiki.js - wiki route module
const express = require('express');
const router = express.Router();

// home page route
router.get('/', function (req, res) {
  res.send('Wiki home page');
});

// about page route
router.get('/about', function (req, res) {
  res.send('About this wiki');
});

module.exports = router;

// to use the router in our main app file we would then `require()` the route module (wiki.js), then call `use()` on the Express application to add the Router to the middleware handling path. The two routes will then be accessible from `/wiki/` and `/wiki/about/`

// example in index.js

// const wiki = require('./wiki.js')

// ...

// app.use('/wiki', wiki)
