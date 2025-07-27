import _ from 'lodash';

const getIndent = (depth) => '    '.repeat(depth);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  const indent = getIndent(depth + 1);
  const bracketIndent = getIndent(depth);
  const lines = Object
    .entries(value)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const formatStylish = (tree) => {
  const iter = (node, depth) => {
    const indent = getIndent(depth);
    const bracketIndent = getIndent(depth - 1);
    const lines = node.map((item) => {
      const makeString = (value, sign) => `${indent.slice(0, -2)}${sign} ${item.key}: ${stringify(value, depth)}`;

      switch (item.type) {
        case 'nested':
          return `${indent}${item.key}: ${iter(item.children, depth + 1)}`;
        case 'deleted':
          return makeString(item.value, '-');
        case 'added':
          return makeString(item.value, '+');
        case 'changed':
          return [
            makeString(item.oldValue, '-'),
            makeString(item.newValue, '+'),
          ].join('\n');
        case 'unchanged':
          return makeString(item.value, ' ');
        default:
          throw new Error(`Unknown type: ${item.type}`);
      }
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(tree, 1);
};

export default formatStylish;
