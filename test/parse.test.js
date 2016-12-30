const test = require('ava');
const { parseLine, parseCompany, parseLocation } = require('../src/parse');

test('#parseLine: handles a single line', t => {
  const input = '| [Medium](https://jobs.medium.com/) | San Francisco, CA |';
  const actual = parseLine(input);
  const expected = {
    company: '[Medium](https://jobs.medium.com/)',
    locations: 'San Francisco, CA'
  };
  t.deepEqual(actual, expected);
});

test('#parseCompany', t => {
  const input = '[ACME](https://www.example.com/us/en/home/careers)'
  const actual = parseCompany(input);
  const expected = {
    name: 'ACME',
    link: 'https://www.example.com/us/en/home/careers'
  };
  t.deepEqual(actual, expected);
});

test('#parseLocation: handles one city in USA', t => {
  const input = 'San Francisco, CA';
  const actual = parseLocation(input);
  const expected = [
    { city: 'San Francisco', state: 'CA', country: 'USA', remote: false }
  ];
  t.deepEqual(actual, expected);
});

test('#parseLocation: handles multiple cities in USA', t => {
  const input = 'Lehi, UT; San Francisco, CA';
  const actual = parseLocation(input);
  const expected = [
    { city: 'Lehi', state: 'UT', country: 'USA', remote: false },
    { city: 'San Francisco', state: 'CA', country: 'USA', remote: false }
  ];
  t.deepEqual(actual, expected);
});

test('#parseLocation: handles remote', t => {
  const input = 'Boston, MA; Remote';
  const actual = parseLocation(input);
  const expected = [
    { city: 'Boston', state: 'MA', country: 'USA', remote: false },
    { remote: true, city: null, state: null, country: null }
  ];
  t.deepEqual(actual, expected);
});

test('#parseLocation: handles cities outside of USA', t => {
  const input = 'Belo Horizonte, MG, Brazil; Brasília, DF, Brazil; Florianópolis, SC, Brazil; Rio de Janeiro, RJ, Brazil; São Paulo, SP, Brazil';
  const actual = parseLocation(input);
  const expected = [
    { city: 'Belo Horizonte', state: 'MG', country: 'Brazil', remote: false },
    { city: 'Brasília', state: 'DF', country: 'Brazil', remote: false },
    { city: 'Florianópolis', state: 'SC', country: 'Brazil', remote: false },
    { city: 'Rio de Janeiro', state: 'RJ', country: 'Brazil', remote: false },
    { city: 'São Paulo', state: 'SP', country: 'Brazil', remote: false }
  ];

  t.deepEqual(actual, expected);
});

test('#parseLocation: handles cities inside & outside of USA', t => {
  const input = 'Buenos Aires, Argentina; Palo Alto, CA';
  const actual = parseLocation(input);
  const expected = [
    { city: 'Buenos Aires', state: null, country: 'Argentina', remote: false },
    { city: 'Palo Alto', state: 'CA', country: 'USA', remote: false }
  ];
  t.deepEqual(actual, expected);
});

test('#parseLocation: handles Washington, D.C.', t => {
  const input = 'Washington, D.C.';
  const actual = parseLocation(input);
  const expected = [
    { city: 'Washington, D.C.', state: null, country: 'USA', remote: false }
  ];
  t.deepEqual(actual, expected);
});

test('#parseLocation: interprets single word as country', t => {
  const input = 'Australia; New Zealand; Singapore';
  const actual = parseLocation(input);
  const expected = [
    { city: null, state: null, country: 'Australia', remote: false },
    { city: null, state: null, country: 'New Zealand', remote: false },
    { city: null, state: null, country: 'Singapore', remote: false }
  ];
  t.deepEqual(actual, expected);
});

test('#parseLocation: handles UK', t => {
  const input = 'London, UK; Milton Keynes, UK';
  const actual = parseLocation(input);
  const expected = [
    { city: 'London', state: null, country: 'UK', remote: false },
    { city: 'Milton Keynes', state: null, country: 'UK', remote: false }
  ];
  t.deepEqual(actual, expected);
});
