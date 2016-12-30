const path = require('path');
const fs = require('fs');
const http = require('https');
const promisify = require('yaku/lib/promisify');

const promisifyAll = obj => {
  const keys = Object.keys(obj);

  keys.forEach(key => {
    if (typeof obj[key] == 'function') {
      const mtd = promisify(obj[key]);
      const mtdName = `${key}Async`;
      obj[mtdName] = mtd;
    }
  });
};

const ROOT_PATH = path.join(__dirname, '..');

module.exports.PATHS = {
  DATA:         ROOT_PATH + '/data',
  DATA_DEFAULT: ROOT_PATH + '/data/list.md'
};

module.exports.readFile = (pathToFile, cb) => {
  fs.readFile(pathToFile, 'utf8', (err, data) => {
    if (err) { cb(err); }

    cb(null, data);
  });
};

module.exports.writeFile = (pathToFile, input, cb) => {
  fs.writeFile(pathToFile, input, (err, data) => {
    if (err) { cb(err); }

    cb(null, data);
  });
};

module.exports.getFile = cb => {
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
      cb(null, str);
    });
  });

  req.on('error', err => cb(err));
  req.end();
};

promisifyAll(module.exports);
