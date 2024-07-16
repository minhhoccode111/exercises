const attachTitle = (name) => 'DR. ' + name;

new Promise((resolve, reject) => {
  resolve('MANHATTAN');
})
  .then(attachTitle)
  .then(console.log);
