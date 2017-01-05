const us_states = require('./locations/us-states');

const preProcessLine = str => (
  str.split('|')
    .map(s => s.trim())
    .filter(s => s.length > 0)
);

module.exports.parseLine = str => {
  const processedLine = preProcessLine(str);

  return {
    company: processedLine[0],
    locations: processedLine[1]
  };
};

module.exports.parseCompany = (str = '') => {
  const len = str.length;

  if (len === 0) { return; }

  let i = 1;

  // capture company name
  while (i < len) {
    if (/\]/.test(str[i])) { break; }
    i += 1;
  }

  // number of spaces between last char in name & first char in link
  const DIST = 2;
  const name = str.slice(1, i);
  const link = str.slice(i + DIST, len - 1);

  return createCompanyObj({ name, link });
};

const isDC = (str1, str2) => str1 === 'Washington' && str2 === 'D.C.';
// does the string "look like" an abbreviation for a state?
const isStatey = str => str.length === 2 && us_states.hasOwnProperty(str);
const isRemote = str => str && /^remote$/i.test(str);

module.exports.parseLocation = (str = '') => {
  const inputArr = str.split(';');

  return inputArr.reduce((output, candidate) => {
    const parts = candidate.split(',').map(part => part.trim());

    let obj;
    const len = parts.length;

    if (len === 1) {
      if (parts[0] === '') { return output; } // handle lingering semi-colons

      if (isRemote(parts[0])) {
        obj = { remote: true };
      } else {
        obj = { country: parts[0] };
      }
    } else if (len === 2 && !isStatey(parts[1])) {
      if (isDC(parts[0], parts[1])) {
        obj = {
          city: parts[0] + ', ' + parts[1],
          country: 'USA'
        };
      } else {
        obj = {
          city: parts[0],
          country: parts[1]
        };
      }
    } else {
      obj = {
        city: parts[0],
        state: parts[1],
        country: parts[2] || 'USA'
      };
    }

    return output.concat(createLocationObj(obj));
  }, []);
};

function createLocationObj(obj) {
  if (obj.hasOwnProperty('remote')) {
    return {
      remote:  true,
      city:    null,
      state:   null,
      country: null
    };
  } else {
    return {
      city:    obj.city    || null,
      state:   obj.state   || null,
      country: obj.country || null,
      remote:  false
    };
  }
}

function createCompanyObj(obj) {
  return {
    name: obj.name || null,
    link: obj.link || null
  };
}
