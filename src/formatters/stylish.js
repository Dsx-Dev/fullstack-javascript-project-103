import _ from 'lodash';

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  const indent = '    '.repeat(depth + 1);
  const closingBracketIndent = '    '.repeat(depth);
  
  // Ordenar alfabéticamente las claves para consistencia
  const sortedKeys = _.sortBy(Object.keys(value));
  const lines = sortedKeys.map((key) => {
    return `${indent}${key}: ${stringify(value[key], depth + 1)}`;
  });
  
  return `{\n${lines.join('\n')}\n${closingBracketIndent}}`;
};

const formatStylish = (diffTree, depth = 1) => {
  const indent = '    '.repeat(depth);
  const closingBracketIndent = '    '.repeat(depth - 1);

  const lines = diffTree.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent.slice(0, -2)}+ ${node.key}: ${stringify(node.value, depth)}`;
      case 'deleted':
        return `${indent.slice(0, -2)}- ${node.key}: ${stringify(node.value, depth)}`;
      case 'unchanged':
        return `${indent}${node.key}: ${stringify(node.value, depth)}`;
      case 'changed': {
        const deletedLine = `${indent.slice(0, -2)}- ${node.key}: ${stringify(node.oldValue, depth)}`;
        const addedLine = `${indent.slice(0, -2)}+ ${node.key}: ${stringify(node.newValue, depth)}`;
        return `${deletedLine}\n${addedLine}`;
      }
      case 'nested':
        const childrenString = formatStylish(node.children, depth + 1);
        return `${indent}${node.key}: ${childrenString}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${closingBracketIndent}}`;
};

export default formatStylish;