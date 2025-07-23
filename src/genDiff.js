import _ from 'lodash';

// Función principal que compara dos objetos y devuelve un "árbol de diferencias"
const genDiff = (obj1, obj2) => {
  // 1. Obtén todas las claves únicas de ambos objetos y ordénalas.
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.sortBy(_.union(keys1, keys2)); // Usa union y sortBy de lodash

  // 2. Itera sobre cada clave para determinar su estado
  const diff = allKeys.map((key) => {
    // Si la clave NO está en obj1
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    // Si la clave NO está en obj2
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    // Si ambos valores son objetos (y no null), recurre
    if (_.isObject(obj1[key]) && _.isObject(obj2[key]) && obj1[key] !== null && obj2[key] !== null) {
      return { key, type: 'nested', children: genDiff(obj1[key], obj2[key]) };
    }
    // Si los valores son diferentes
    if (!_.isEqual(obj1[key], obj2[key])) { // Usa isEqual de lodash para comparar valores complejos
      return { key, type: 'changed', oldValue: obj1[key], newValue: obj2[key] };
    }
    // Si los valores son idénticos
    return { key, type: 'unchanged', value: obj1[key] };
  });

  return diff;
};

export default genDiff;