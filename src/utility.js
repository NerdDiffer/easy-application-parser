const path = require('path');
const fs = require('fs');
const http = require('https');

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

module.exports.getFile = handleSuccess => {
  const options = {
    'hostname': 'raw.githubusercontent.com',
    'path': '/j-delaney/easy-application/master/README.md',
    'headers': {
      'cache-control': 'no-cache',
    }
  };

  const req = http.get(options, res => {
    const chunks = [];

    res.on('data', chunk => chunks.push(chunk));
    res.on('end', () => {
      const body = Buffer.concat(chunks);
      const str = body.toString();
      handleSuccess(str);
    });
  });

  req.on('error', e => console.log(e.message));
  req.end();
};
