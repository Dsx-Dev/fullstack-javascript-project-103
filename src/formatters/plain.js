// src/formatters/plain.js
import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const formatPlain = (diffTree, path = '') => {
  const lines = diffTree
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const currentPath = path === '' ? node.key : `${path}.${node.key}`;
      switch (node.type) {
        case 'added':
          return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`;
        case 'deleted':
          return `Property '${currentPath}' was removed`;
        case 'changed':
          return `Property '${currentPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
        case 'nested':
          return formatPlain(node.children, currentPath);
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    });

  return lines.join('\n');
};

export default formatPlain;