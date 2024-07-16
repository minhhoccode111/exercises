new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('FULFILLED!');
  }, 300);
}).then(console.log);
