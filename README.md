[![Build Status](https://travis-ci.org/decompil3d/random-from-collection.svg?branch=master)](https://travis-ci.org/decompil3d/random-from-collection) [![Coverage Status](https://coveralls.io/repos/github/decompil3d/random-from-collection/badge.svg?branch=master)](https://coveralls.io/github/decompil3d/random-from-collection?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/decompil3d/random-from-collection.svg)](https://greenkeeper.io/)

[![NPM](https://nodei.co/npm/random-from-collection.png?downloads=true&stars=true)](https://nodei.co/npm/random-from-collection/)

# `random-from-collection`

Get a random set of _n_ distinct values from a standard collection (i.e. `Map`, `Set`).

## Why?

Types like `Map` and `Set` do not allow for access by index, so pulling a random set of values requires using an
iterator. This package handles that scenario.

## API

This package exports a single function that accepts a collection and a number of values to select. The collection can be
any object that provides a `size` or `length` property/getter, and a `keys()` method that returns an iterator. In
particular, it is useful for built-in types like `Map` and `Set`.

It can be used on Arrays, but wouldn't really be very efficient, as Array allows for direct access by index so it is
much faster to use a package like [`array-shuffle`](https://www.npmjs.com/package/array-shuffle) instead.

## Usage

```js
const randomFromCollection = require('random-from-collection');

const mySet = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const setResults = randomFromCollection(mySet, 5);
/*
[1, 4, 6, 8, 9]
*/

const myMap = new Map([
  ['a', 'A'],
  ['b', 'B'],
  ['c', 'C']
]);
const mapResults = randomFromCollection(myMap, 2);
/*
['a', 'c']
*/

// Need Map values?
const mapResultsValues = mapResults.map(k => myMap.get(k));
/*
['A', 'C']
*/
```

## Tests

We have tests. You can run them for great justice.

```sh
npm test
```

## Contributing

Sure. Go ahead. Just remember to include tests. k thx.
