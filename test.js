const assume = require('assume');
const randomFromCollection = require('./index');
const { fixtureMap, fixtureSet, fixtureCollection, fixtureArray } = require('./fixtures/collections.js');

describe('random-from-collection', function () {
  it('is a function', function () {
    assume(randomFromCollection).is.a('function');
    assume(randomFromCollection).has.length(2);
  });

  it('returns an empty array when howMany is 0', function () {
    const result = randomFromCollection(fixtureSet, 0);
    assume(result).is.an('array');
    assume(result).has.length(0);
  });

  it('returns an empty array when howMany is -1', function () {
    const result = randomFromCollection(fixtureSet, -1);
    assume(result).is.an('array');
    assume(result).has.length(0);
  });

  it('returns an empty array when collection is empty', function () {
    const result = randomFromCollection(new Set([]), 5);
    assume(result).is.an('array');
    assume(result).has.length(0);
  });

  it('returns all items in the collection when howMany is > collection size', function () {
    const result = randomFromCollection(fixtureSet, fixtureSet.size + 1);
    assume(result).is.an('array');
    assume(result).has.length(fixtureSet.size);
  });

  it('retrieves keys from a map', function () {
    const result = randomFromCollection(fixtureMap, 1);
    assume(result).is.an('array');
    assume(result).has.length(1);
    assume(result[0]).is.a('string');
    // Value of fixture is boolean, so above would fail if it grabbed the value instead of the key
    assume(fixtureMap.has(result[0])).is.true();
  });

  it('retrieves the right number of values', function () {
    const result = randomFromCollection(fixtureSet, 25);
    assume(result).has.length(25);
  });

  it('fetches distinct values', function () {
    const result = randomFromCollection(fixtureArray, fixtureArray.length);
    const set = new Set(result);
    assume(set.size).equals(fixtureArray.length);
    assume(fixtureArray.every(d => set.has(d)));
  });

  it('works with generic collection-like types', function () {
    const result = randomFromCollection(fixtureCollection, 5);
    assume(result).is.an('array');
    assume(result).has.length(5);
  });
});

describe('.getValuesFromCollection', function () {
  const { getValuesFromCollection } = randomFromCollection;

  it('is a function', function () {
    assume(getValuesFromCollection).is.a('function');
    assume(getValuesFromCollection).has.length(2);
  });

  it('returns an empty array if indices is null', function () {
    const result = getValuesFromCollection([1, 2, 3], null);
    assume(result).is.an('array');
    assume(result).has.length(0);
  });

  it('returns an empty array if indices is empty', function () {
    const result = getValuesFromCollection([1, 2, 3], []);
    assume(result).is.an('array');
    assume(result).has.length(0);
  });

  it('gets the correct set of indices', function () {
    const result = getValuesFromCollection([0, 1, 2, 3, 4, 5], [0, 2, 5]);
    assume(result).deep.equals([0, 2, 5]);
  });
});
