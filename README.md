# Easy Application Parser

There is a list of companies that are considered easy to apply to:

https://github.com/j-delaney/easy-application

It's a long markdown file. Each company is a row in a table with 2 columns:

1. company name
2. location

This project is an attempt to query companies in the list.

### Usage

Get the list, save to disk, read:

```js
getSaveReadThen(showRandomLine);
getSaveReadThen(parseAndPrintCompanies);
```

If you've already gotten & saved the file locally, just read it:

```js
readThen(showRandomLine);
readThen(parseAndPrintCompanies);
```

#### Custom callbacks

Write your own callbacks to pass to `getSaveReadThen` or `readThen` methods.
Data comes in as a utf8 string.

```js
function cb(foo) {
  console.log(typeof foo); // string
  const bar = foo.split("\n");
  console.log(Array.isArray(bar)); // true
}
```

You could also use `parseCompanies` as a template to straight to the companies:

```js
const showCompaniesInWA = parseCompanies.bind(null, row => {
  const { locations } = row;
  const isLocationMatch = locations.some(loc => loc.state === 'WA');
  if (isLocationMatch) { console.log(row.company); }
});

readThen(showCompaniesInWA);
```

#### Table row data as an object

Each `row` object has two properties:

1. `company`: an object
1. `locations`: an array of objects

##### company

```js
{
  name: 'name of the company',
  link: 'link to their careers & info page'
}
```

##### locations

The `locations` property is an array of objects. The make-up of the array will
vary from company to company. But each object in the array looks like:

```js
// If marked as "Remote":
{
  remote:  true,
  city:    null,
  state:   null,
  country: null
}

// Otherwise:
{
  remote:   false,
  city:    'city name if available' || null,
  state:   'state if available'     || null,
  country: 'country if available'   || null
}
```
