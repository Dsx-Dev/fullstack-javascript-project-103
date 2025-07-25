import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const allKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return allKeys.map((key) => {
    // La clave solo existe en el primer objeto (eliminada)
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    // La clave solo existe en el segundo objeto (añadida)
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    // Ambas claves existen y sus valores son objetos (recursión)
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key, type: 'nested', children: genDiff(obj1[key], obj2[key]) };
    }
    // Ambas claves existen, los valores son diferentes (cambiado)
    if (obj1[key] !== obj2[key]) {
      return { key, type: 'changed', oldValue: obj1[key], newValue: obj2[key] };
    }
    // Ambas claves existen, los valores son iguales (sin cambios)
    return { key, type: 'unchanged', value: obj1[key] };
  });
};

export default genDiff;