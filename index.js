const utility = require('./src/utility');
const query = require('./src/query');
const parse = require('./src/parse');

const getSaveReadThen = cb => {
  const { PATHS, getFileAsync, writeFileAsync, readFileAsync } = utility;

  return getFileAsync()
    .then(data => writeFileAsync(PATHS.DATA_DEFAULT, data))
    .then(() => readFileAsync(PATHS.DATA_DEFAULT))
    .then(data => cb(data))
    .catch(err => console.log(err));
};

const readThen = cb => {
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

function showRandomLine(data) {
  const arr = data.split("\n");
  const line = query.randomLine(arr);
  const parsed = parse.parseLine(line);

  const { company, locations } = parsed;

  console.log(parse.parseCompany(company));
  console.log(parse.parseLocation(locations));
}

function parseCompanies(data) {
  const arr = data.split("\n");
  const len = arr.length;

  let hasTableStarted = false;
  let i = 0;

  // find the start of the table
  do {
    if (!hasTableStarted && detectTable(arr, i)) {
      hasTableStarted = true;
      break;
    }

    i += 1;
  } while (i < len);

  i += 2; // jump to first table row

  let line = arr[i];
  const { parseLine, parseCompany, parseLocation } = parse;

  // just read, assuming they're all table rows
  while (i < len) {
    if (line === '') { break; } // assumes last line or end of table is an empty string

    const { company, locations } = parseLine(line);
    const parsedLine = {
      company: parseCompany(company),
      locations: parseLocation(locations)
    };

    console.log(parsedLine);

    line = arr[i += 1];
  }

  function detectTable(arr, ind) {
    const len = arr.length;

    // needs 3 or more lines
    if (len - ind < 3) { return false; }

    // first character of the second line should be '|', '-', ':',
    // and no other characters are allowed but spaces;
    // basically, this is the equivalent of /^[-:|][-:|\s]*$/ regexp

    if (!(/^[-:|][-:|\s]*$/.test(arr[ind + 1]))) { return false; }

    // TODO:
    // count number of columns in current, next & row after that.
    // if all the same, then you're in a table.

    return true; // for now, this is fine...
  }
}
