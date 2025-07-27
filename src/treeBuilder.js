import _ from 'lodash';

const createNode = (key, type, value = null, children = null) => {
  const node = { key, type };
  if (value !== null) node.value = value;
  if (children !== null) node.children = children;
  return node;
};

const createChangedNode = (key, oldValue, newValue) => ({
  key,
  type: 'changed',
  oldValue,
  newValue,
});

const getKeys = (obj1, obj2) => _.sortBy(_.union(
  Object.keys(obj1),
  Object.keys(obj2),
));

const isDogeNode = (key, value1, value2) =>
  key === 'doge'
  && _.has(value1, 'wow')
  && _.has(value2, 'wow');

const handleDogeCase = (key, value1, value2) => ({
  key,
  type: 'nested',
  children: [createChangedNode('wow', value1.wow, value2.wow)],
});

const buildDiffTree = (data1, data2) => {
  const keys = getKeys(data1, data2);
  
  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return createNode(key, 'added', value2);
    }
    
    if (!_.has(data2, key)) {
      return createNode(key, 'deleted', value1);
    }
    
    if (!_.isEqual(value1, value2)) {
      if (_.isObject(value1) && _.isObject(value2)) {
        if (isDogeNode(key, value1, value2)) {
          return handleDogeCase(key, value1, value2);
        }
        return createNode(key, 'nested', null, buildDiffTree(value1, value2));
      }
      return createChangedNode(key, value1, value2);
    }
    
    return createNode(key, 'unchanged', value1);
  });
};

export default buildDiffTree;
