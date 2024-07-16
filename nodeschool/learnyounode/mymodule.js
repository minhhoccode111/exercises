const fs = require('fs');

module.exports = function (path, extension, cb) {
  fs.readdir(path, (err, files) => {
    if (err) return cb(err);

    return cb(
      null,
      files.filter((file) => file.endsWith('.' + extension))
    );
  });
};
