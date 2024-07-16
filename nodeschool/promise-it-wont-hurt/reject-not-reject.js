const p = new Promise((resolve, reject) => {
  resolve('I FIRED');
  reject(new Error('I DID NOT FIRE'));
});

const onRejected = (e) => console.error(e.message);

p.then(console.log, onRejected);
