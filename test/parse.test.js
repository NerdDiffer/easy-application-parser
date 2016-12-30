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
    { city: 'San Francisco', state: 'CA', country: 'USA' }
  ];
  t.deepEqual(actual, expected);
});

test('#parseLocation: handles multiple cities in USA', t => {
  const input = 'Lehi, UT; San Francisco, CA';
  const actual = parseLocation(input);
  const expected = [
    { city: 'Lehi', state: 'UT', country: 'USA' },
    { city: 'San Francisco', state: 'CA', country: 'USA' }
  ];
  t.deepEqual(actual, expected);
});

test('#parseLocation: handles remote', t => {
  const input = 'Boston, MA; Remote';
  const actual = parseLocation(input);
  const expected = [
    { city: 'Boston', state: 'MA', country: 'USA' },
    { remote: true }
  ];
  t.deepEqual(actual, expected);
});

test('#parseLocation: handles cities outside of USA', t => {
  const input = 'Belo Horizonte, MG, Brazil; Brasília, DF, Brazil; Florianópolis, SC, Brazil; Rio de Janeiro, RJ, Brazil; São Paulo, SP, Brazil';
  const actual = parseLocation(input);
  const expected = [
    { city: 'Belo Horizonte', state: 'MG', country: 'Brazil' },
    { city: 'Brasília', state: 'DF', country: 'Brazil' },
    { city: 'Florianópolis', state: 'SC', country: 'Brazil' },
    { city: 'Rio de Janeiro', state: 'RJ', country: 'Brazil' },
    { city: 'São Paulo', state: 'SP', country: 'Brazil' }
  ];

  t.deepEqual(actual, expected);
});

test('#parseLocation: handles cities inside & outside of USA', t => {
  const input = 'Buenos Aires, Argentina; Palo Alto, CA';
  const actual = parseLocation(input);
  const expected = [
    { city: 'Buenos Aires', country: 'Argentina' },
    { city: 'Palo Alto', state: 'CA', country: 'USA' }
  ];
  t.deepEqual(actual, expected);
});

test('#parseLocation: handles Washington, D.C.', t => {
  const input = 'Washington, D.C.';
  const actual = parseLocation(input);
  const expected = [
    { city: 'Washington, D.C.', country: 'USA' }
  ];
  t.deepEqual(actual, expected);
});

test('#parseLocation: interprets single word as country', t => {
  const input = 'Australia; New Zealand; Singapore';
  const actual = parseLocation(input);
  const expected = [
    { country: 'Australia' },
    { country: 'New Zealand' },
    { country: 'Singapore' }
  ];
  t.deepEqual(actual, expected);
});

test('#parseLocation: handles UK', t => {
  const input = 'London, UK; Milton Keynes, UK';
  const actual = parseLocation(input);
  const expected = [
    { city: 'London', country: 'UK' },
    { city: 'Milton Keynes', country: 'UK' }
  ];
  t.deepEqual(actual, expected);
});
