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
