// does the string "look like" an abbreviation for a state?
const isStatey = str => str.length === 2 && /[A-Z]/.test(str);
const isRemote = str => str && /^remote$/i.test(str);

module.exports.parseLocation = str => {
  const inputArr = str.split(';');

  return inputArr.reduce((output, candidate) => {
    const parts = candidate.split(',').map(part => part.trim());

    let obj;

    if (isRemote(parts[0])) {
      obj = { remote: true };
    } else if (parts.length === 2 && !isStatey(parts[1])) {
      obj = {
        city: parts[0],
        country: parts[1]
      };
    } else {
      obj = {
        city: parts[0],
        state: parts[1],
        country: parts[2] || 'USA'
      };
    }

    return output.concat(obj);
  }, []);
};
