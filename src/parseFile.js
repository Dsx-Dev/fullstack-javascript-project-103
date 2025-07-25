
// src/gendiff.js
import _ from 'lodash';
import parseFile from './parsers/index.js';
import formatOutput from './formatters/index.js';

const buildDiffTree = (obj1, obj2) => {
  // Ordenar alfabéticamente para consistencia con el formatter
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.sortBy(_.union(keys1, keys2));

  return allKeys.map((key) => {
    const hasKey1 = _.has(obj1, key);
    const hasKey2 = _.has(obj2, key);

    if (!hasKey2) {
      // Clave solo existe en obj1 (eliminada)
      return { key, type: 'deleted', value: obj1[key] };
    }
    
    if (!hasKey1) {
      // Clave solo existe en obj2 (añadida)
      return { key, type: 'added', value: obj2[key] };
    }

    const value1 = obj1[key];
    const value2 = obj2[key];

    // Ambos valores son objetos - recursión
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { 
        key, 
        type: 'nested', 
        children: buildDiffTree(value1, value2) 
      };
    }

    // Valores diferentes - cambio
    if (value1 !== value2) {
      return { 
        key, 
        type: 'changed', 
        oldValue: value1, 
        newValue: value2 
      };
    }

    // Valores iguales - sin cambio
    return { key, type: 'unchanged', value: value1 };
  });
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const diffTree = buildDiffTree(obj1, obj2);

  return formatOutput(diffTree, formatName);
};