// src/formatters/plain.js
import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return String(value);
};

const formatNodeChange = (path, type, value = null, oldValue = null, newValue = null) => {
  switch (type) {
    case 'added':
      return `Property '${path}' was added with value: ${formatValue(value)}`;
    case 'deleted':
      return `Property '${path}' was removed`;
    case 'changed':
      return `Property '${path}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
    default:
      throw new Error(`Unknown node type: ${type}`);
  }
};

const formatPlain = (diffTree, path = '') => {
  const lines = diffTree
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const currentPath = path === '' ? node.key : `${path}.${node.key}`;
      return node.type === 'nested'
        ? formatPlain(node.children, currentPath)
        : formatNodeChange(
          currentPath,
          node.type,
          node.value,
          node.oldValue,
          node.newValue,
        );
    });

  return lines.join('\n');
};

export default formatPlain;
