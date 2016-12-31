const utility = require('./src/utility');
const query = require('./src/query');
const parse = require('./src/parse');
const tableHelpers = require('./src/table-helpers');

/* getting, reading list */

module.exports.getSaveReadThen = cb => {
  const { PATHS, getFileAsync, writeFileAsync, readFileAsync } = utility;

  return getFileAsync()
    .then(data => writeFileAsync(PATHS.DATA_DEFAULT, data))
    .then(() => readFileAsync(PATHS.DATA_DEFAULT))
    .then(data => cb(data))
    .catch(err => console.log(err));
};

module.exports.readThen = cb => {
  const { PATHS, readFileAsync } = utility;

  return readFileAsync(PATHS.DATA_DEFAULT)
    .then(data => cb(data))
    .catch(err => {
      if (err.code === 'ENOENT') {
        const msg = 'Try "getSaveReadThen" to get, save & read the file';
        console.log(msg);
        console.log(err);
      }
    });
};

/* callbacks, pass to methods above */

module.exports.showRandomLine = data => {
  const arr = data.split("\n");
  const line = query.randomLine(arr);
  const parsed = parse.parseLine(line);

  const { company, locations } = parsed;

  console.log(parse.parseCompany(company));
  console.log(parse.parseLocation(locations));
};

// bind to a callback `cb`
const parseCompanies = (cb, data) => {
  const arr = data.split("\n");
  const { findTableStart, eachFrom } = tableHelpers;

  let i = findTableStart(arr, 0);
  i += 2; // jump to first table row

  eachFrom(arr, i, cb);
};

module.exports.parseCompanies = parseCompanies;
module.exports.parseAndPrintCompanies = parseCompanies.bind(null, console.log);
