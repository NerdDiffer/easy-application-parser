const path = require('path');
const fs = require('fs');

const ROOT_PATH = path.join(__dirname, '..');

module.exports.PATHS = {
  DATA:         ROOT_PATH + '/data',
  DATA_DEFAULT: ROOT_PATH + '/data/list.md'
};

module.exports.readFile = (pathToFile, handleSuccess) => {
  fs.readFile(pathToFile, 'utf8', (err, data) => {
    if (err) { throw err; }

    handleSuccess(data);
  });
};
