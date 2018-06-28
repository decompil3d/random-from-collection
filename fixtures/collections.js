const rawData = [
  'Lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'Curabitur',
  'pharetra',
  'rhoncus',
  'commodo',
  'Maecenas',
  'auctor',
  'dui',
  'et',
  'magna',
  'varius',
  'nec',
  'tristique',
  'diam',
  'mattis',
  'Aliquam',
  'quis',
  'massa',
  'laoreet',
  'ornare',
  'arcu',
  'eget',
  'mollis',
  'turpis',
  'Vestibulum',
  'iaculis',
  'convallis',
  'enim',
  'a',
  'fringilla',
  'egestas',
  'vel',
  'Morbi',
  'orci',
  'erat',
  'sagittis',
  'tincidunt',
  'non',
  'posuere',
  'eu',
  'nunc',
  'Nunc',
  'justo',
  'efficitur',
  'leo',
  'facilisis',
  'tempus',
  'sem',
  'Phasellus',
  'lectus',
  'vitae',
  'pellentesque'
];

/**
 * Generic collection class to ensure that this library works with non-Set/Map collections
 */
class Collection {
  constructor(data) {
    this.data = data;
  }

  get size() {
    return this.data.length;
  }

  keys() {
    return this.data.keys();
  }
}

module.exports = {
  fixtureMap: new Map(rawData.map(d => [d, true])),
  fixtureSet: new Set(rawData),
  fixtureCollection: new Collection(rawData),
  fixtureArray: rawData
};
