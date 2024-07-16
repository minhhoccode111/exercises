const fs = require('fs');

const path = process.argv[2];

fs.readFile(path, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data.match(/\n/gim).length);
});

/**
 *   Create a file named my-first-async-io.js.  
   
  Write a program that uses a single asynchronous filesystem operation to  
  read a file and print the number of newlines it contains to the console  
  (stdout), similar to running cat file | wc -l.  
   
  The full path to the file to read will be provided as the first  
  command-line argument.  
 */
