const net = require('net');

const port = process.argv[2];

const padding = (number) => {
  return number.toString().padStart(2, '0');
};

const now = () => {
  const d = new Date();

  const string = `${d.getFullYear()}-${padding(d.getMonth() + 1)}-${padding(d.getDate())} ${padding(d.getHours())}:${padding(d.getMinutes())}`;

  return string + '\n';
};

net
  .createServer((socket) => {
    socket.end(now());
  })
  .listen(port, () => {});

/**
   *   Create a file named time-server.js.  
   
  Write a TCP time server!  
   
  Your server should listen to TCP connections on the port provided by the  
  first argument to your program. For each connection you must write the  
  current date & 24 hour time in the format:  
   
     "YYYY-MM-DD hh:mm"  
   
  followed by a newline character. Month, day, hour and minute must be  
  zero-filled to 2 integers. For example:  
   
     "2013-07-06 17:42"  
   
  After sending the string, close the connection. 
   */
