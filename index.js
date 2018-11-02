/**
 * @callback IteratorFn
 * @returns {Iterator} An iterator
 */
/**
 * @typedef OtherCollection<T>
 * @template T
 * @prop {number} [size] The number of items in the collection
 * @prop {number} [length] The number of items in the collection
 * @prop {IteratorFn} keys Returns an iterator for the keys in the collection
 * Note: either `size` or `length` must be specified
 */
/**
 * Get a random set of distinct values from the specified collection
 *
 * @param {Map<T>|Set<T>|T[]|OtherCollection<T>} collection The collection from which to select values.
 * @param {number} howMany How many values to retrieve. If this exceeds `collection.size`, all values will be returned.
 * @returns {T[]} An array of distinct values, of length `howMany`
 * @template T
 * @public
 */
const randomFromCollection = module.exports = function randomFromCollection(collection, howMany) {
  if (howMany < 1)
    return [];

  const collectionSize = typeof collection.size === 'number' ? collection.size : collection.length;

  howMany = Math.min(howMany, collectionSize);

  const indicies = getRandomIndicies(collectionSize, howMany);
  indicies.sort((a, b) => a - b);

  return getValuesFromCollection(collection, indicies);
};

/**
 * Get a random set of `howMany` indicies for a collection of the specified size
 *
 * @param {number} collectionSize The length of the collection
 * @param {number} howMany How many random indicies to generate
 * @returns {number[]} An array of distict random indicies in the specified range
 * @private
 */
function getRandomIndicies(collectionSize, howMany) {
  const set = new Set();
  for (let i = 0; i < howMany; i++) {
    const candidate = getRandomInt(0, collectionSize);
    if (set.has(candidate)) {
      i--;
    } else {
      set.add(candidate);
    }
  }

  return Array.from(set);
}

/**
 * Get a random integer between two values [min, max)
 *
 * @param {number} min The minimum possible value (inclusive)
 * @param {number} max The maximum bound (exclusive)
 * @returns {number} A random integer in [min, max)
 * @private
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getValuesFromCollection(collection, indicies) {
  if (!indicies || indicies.length === 0) {
    return [];
  }

  let i = 0, j = 0;
  let indexToFind = indicies[j++];
  const ret = [];
  const iter = collection.keys();
  let current = iter.next();
  while (!current.done && j <= indicies.length) {
    if (i++ === indexToFind) {
      ret.push(current.value);
      indexToFind = indicies[j++];
    }
    current = iter.next();
  }

  return ret;
}

// Export getValuesFromCollection as well for unit testing
randomFromCollection.getValuesFromCollection = getValuesFromCollection;
