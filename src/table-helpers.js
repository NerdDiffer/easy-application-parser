const parse = require('./parse');

const detectTable = (arr, ind) => {
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
};

module.exports.findTableStart = (arr, ind) => {
  const len = arr.length;
  let hasTableStarted = false;

  do {
    if (!hasTableStarted && detectTable(arr, ind)) {
      hasTableStarted = true;
      break;
    }

    ind += 1;
  } while (ind < len);

  return ind;
};

// visit each array member, starting from an index. assumes they're all table rows.
module.exports.eachFrom = (arr, startingInd) => {
  const len = arr.length;
  const { parseLine, parseCompany, parseLocation } = parse;

  let i = startingInd;
  let line = arr[i];

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
};
