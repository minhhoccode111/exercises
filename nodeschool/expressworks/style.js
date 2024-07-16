const express = require('express');
const app = express();

// a way to activate middleware Stylus in express and specify the directory to store generated Stylus files
// middleware Stylus is used to auto transpile Stylus files in /public to CSS when a we receive a request. It helps reduce the manually transpile and flexible of CSS codebase
app.use(require('stylus').middleware(process.argv[3]));
app.use(express.static(process.argv[3]));

app.listen(process.argv[2], () => {
  // console.log(`Listening on port: ${process.argv[2]}`)
});
