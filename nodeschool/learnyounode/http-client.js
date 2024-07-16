const http = require('http');

const url = process.argv[2];

http
  .get(url, (res) => {
    res.setEncoding('utf8');

    res.on('data', console.log);

    res.on('error', console.error);
  })
  .on('error', console.error);

/**
   *   Create a file named http-client.js.  
   
  Write a program that performs an HTTP GET request to a URL provided to you  
  as the first command-line argument. Write the String contents of each  
  "data" event from the response to a new line on the console (stdout).  

   */
