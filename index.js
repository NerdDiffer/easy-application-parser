const utility = require('./src/utility');
const query = require('./src/query');
const parse = require('./src/parse');

const { PATHS, readFile } = utility;

readFile(PATHS.DATA_DEFAULT, data => {
  const arr = data.split("\n");
  const line = query.randomLine(arr);
  const parsed = parse.parseLine(line);

  const { company, locations } = parsed;

  console.log(parse.parseCompany(company));
  console.log(parse.parseLocation(locations));
});
