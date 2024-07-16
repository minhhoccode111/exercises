new Promise((resolve, reject) => {
  reject(new Error('Khong dieu kien'));
}).catch(console.error);

Promise.resolve('Khong dieu kien');
Promise.reject('Tai vi sao');
