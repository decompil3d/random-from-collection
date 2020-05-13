/**
 * @callback IteratorFn<T>
 * @returns {IterableIterator<T>} An iterator
 * @template T
 */
/**
 * @typedef {Object} OtherCollection<T>
 * @prop {number} [size] The number of items in the collection
 * @prop {number} [length] The number of items in the collection
 * @prop {IteratorFn<T>} keys Returns an iterator for the keys in the collection
 * @template T
 * Note: either `size` or `length` must be specified
 */
/**
 * @typedef {Map<T, any>|Set<T>|T[]|OtherCollection<T>} AnyCollection
 * @template T
 */
/**
 * Get a random set of distinct values from the specified collection
 *
 * @param {AnyCollection<T>} collection The collection from which to select values.
 * @param {number} howMany How many values to retrieve. If this exceeds `collection.size`, all values will be returned.
 * @returns {T[]} An array of distinct values, of length `howMany`
 * @template T
 * @public
 */
const randomFromCollection = module.exports = function randomFromCollection(collection, howMany) {
  if (howMany < 1)
    return [];

  // @ts-ignore
  const collectionSize = typeof collection.size === 'number' ? collection.size : collection.length;

  howMany = Math.min(howMany, collectionSize);

  const indices = getRandomIndices(collectionSize, howMany);
  indices.sort((a, b) => a - b);

  return getValuesFromCollection(collection, indices);
};

/**
 * Get a random set of `howMany` indices for a collection of the specified size
 *
 * @param {number} collectionSize The length of the collection
 * @param {number} howMany How many random indices to generate
 * @returns {number[]} An array of distinct random indices in the specified range
 * @private
 */
function getRandomIndices(collectionSize, howMany) {
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

/**
 * Get values at the specified indices from the specified collection
 *
 * @param {AnyCollection<T>} collection The collection from which to get values
 * @param {number[]} indices The indices within the collection to collect
 * @returns {T[]} An array of the values that were collected
 * @template T
 * @private
 */
function getValuesFromCollection(collection, indices) {
  if (!indices || indices.length === 0) {
    return [];
  }

  let i = 0, j = 0;
  let indexToFind = indices[j++];
  const ret = [];
  const iter = collection.keys();
  let current = iter.next();
  while (!current.done && j <= indices.length) {
    if (i++ === indexToFind) {
      ret.push(current.value);
      indexToFind = indices[j++];
    }
    current = iter.next();
  }

  return ret;
}

// Export getValuesFromCollection as well for unit testing
randomFromCollection.getValuesFromCollection = getValuesFromCollection;
