const MongoClient = require('mongodb').MongoClient;

// v2.*
// MongoClient.connect('mongodb://localhost:27017/animals', (err, db) => {
//   if (err) throw err;

//   db.collection('mammals')
//     .find()
//     .toArray((err, result) => {
//       if (err) throw err;

//       console.log(result);
//     });
// });

// v3.*

MongoClient.connect('mongodb://localhost:27017/animals', (err, client) => {
  if (err) throw err;

  const db = client.db('animals');

  db.collection('mammals')
    .find()
    .toArray((err, result) => {
      if (err) throw err;

      console.log(result);
    });
});
