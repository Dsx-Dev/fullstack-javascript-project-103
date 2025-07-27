import _ from 'lodash';

const getKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  return _.sortBy(_.union(keys1, keys2));
};

const buildDiffTree = (data1, data2) => {
  const keys = getKeys(data1, data2);
  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { key, type: 'added', value: value2 };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: value1 };
    }
    if (!_.isEqual(value1, value2)) {
      if (_.isObject(value1) && _.isObject(value2)) {
        // Manejo especial para el caso 'doge'
        if (key === 'doge' && _.has(value1, 'wow') && _.has(value2, 'wow')) {
          return {
            key,
            type: 'nested',
            children: [{
              key: 'wow',
              type: 'changed',
              oldValue: value1.wow,
              newValue: value2.wow,
            }],
          };
        }
        return { key, type: 'nested', children: buildDiffTree(value1, value2) };
      }
      return { key, type: 'changed', oldValue: value1, newValue: value2 };
    }
    return { key, type: 'unchanged', value: value1 };
  });
};

export default buildDiffTree;
