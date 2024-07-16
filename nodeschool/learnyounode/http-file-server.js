const fs = require('fs');

const http = require('http');

const port = Number(process.argv[2]);

const path = process.argv[3];

http
  .createServer((_, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    fs.createReadStream(path).pipe(res);
  })
  .listen(port, () => {});

/**
   *   Create a file named http-file-server.js.  
   
  Write an HTTP server that serves the same text file for each request it  
  receives.  
   
  Your server should listen on the port provided by the first argument to  
  your program.  
   
  You will be provided with the location of the file to serve as the second  
  command-line argument. You must use the fs.createReadStream() method to  
  stream the file contents to the response.  

   */
