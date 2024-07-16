const http = require('http');

const port = Number(process.argv[2]);

http
  .createServer((req, res) => {
    const data = [];
    req.setEncoding('utf8');

    req.on('data', (chunk) => {
      data.push(chunk.toUpperCase());
    });

    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data.join(''));
    });
  })
  .listen(port, () => {
    console.log(`A server is listening on port: ${port}`);
  });

/**
   *   Create a file named http-uppercaserer.js.  
   
  Write an HTTP server that receives only POST requests and converts  
  incoming POST body characters to upper-case and returns it to the client.  
   
  Your server should listen on the port provided by the first argument to  
  your program.  
   */
