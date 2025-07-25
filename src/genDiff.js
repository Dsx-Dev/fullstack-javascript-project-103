// src/genDiff.js
import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.sortBy(_.union(keys1, keys2));

  return allKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    if (obj1[key] === obj2[key]) {
      return { key, type: 'unchanged', value: obj1[key] };
    }
    // Si los valores son diferentes
    return { key, type: 'changed', oldValue: obj1[key], newValue: obj2[key] };
  });
};

export default genDiff;