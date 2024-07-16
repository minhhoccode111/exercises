const http = require('q-io/http'),
  url = 'http://localhost:1337';

http
  .read(url)
  .then((response) => console.log(JSON.parse(response)))
  .catch(console.log);
