const http = require("q-io/http"),
  cacheUrl = "http://localhost:7000",
  databaseUrl = "http://localhost:7001";

const fetchId = (url) => http.read(url),
  getUser = (url, id) => http.read(`${url}/${id}`);

fetchId(cacheUrl)
  .then((id) => getUser(databaseUrl, id))
  .then((res) => console.log(JSON.parse(res)))
  .catch(console.log);
