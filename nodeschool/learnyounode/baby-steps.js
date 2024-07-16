console.log(process.argv.reduce((total, current) => (isNaN(Number(current)) ? total : total + Number(current)), 0));

/**
   * Create a file named baby-steps.js.  
   
  Write a program that accepts one or more numbers as command-line arguments  
  and prints the sum of those numbers to the console (stdout).  
   */
