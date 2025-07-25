import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.sortBy(_.union(keys1, keys2));

  return allKeys.map((key) => {
    // 1. Ambas claves no están presentes (caso de error, no debería ocurrir aquí)
    if (!_.has(obj1, key) && !_.has(obj2, key)) {
      return { key, type: 'unchanged', value: null }; // O manejar como error
    }

    // 2. La clave fue eliminada
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }

    // 3. La clave fue añadida
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }

    // 4. Ambos valores son objetos y son diferentes (recursión)
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        // Llama a la función genDiff RECURSIVAMENTE
        const children = genDiff(obj1[key], obj2[key]);
        return { key, type: 'nested', children };
    }

    // 5. Los valores son primitivos y son diferentes
    if (obj1[key] !== obj2[key]) {
      return { key, type: 'changed', oldValue: obj1[key], newValue: obj2[key] };
    }

    // 6. Los valores son iguales (primitivos o objetos idénticos)
    return { key, type: 'unchanged', value: obj1[key] };
  });
};

export default genDiff;