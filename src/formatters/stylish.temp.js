import _ from 'lodash';

const getIndent = (depth) => '    '.repeat(depth);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  const indent = getIndent(depth + 1);
  const closingBracketIndent = getIndent(depth);
  const sortedKeys = _.sortBy(Object.keys(value));
  const lines = sortedKeys.map((key) => `${indent}${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${lines.join('\n')}\n${closingBracketIndent}}`;
};

const formatStylish = (diffTree, depth = 1) => {
  const indent = getIndent(depth);
  const closingBracketIndent = getIndent(depth - 1);

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
        return `${indent}${node.key}: ${formatStylish(node.children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${closingBracketIndent}}`;
};

export default formatStylish;
