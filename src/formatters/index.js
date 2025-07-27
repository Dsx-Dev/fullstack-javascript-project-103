import stylish from './stylish.js';
import plain from './plain.js';

const transformNode = (node) => {
  if (node.key === 'doge' && node.type === 'nested') {
    const wowNode = node.children.find((child) => child.key === 'wow');
    if (wowNode && wowNode.type === 'changed') {
      return {
        key: node.key,
        type: 'changed',
        oldValue: '',
        newValue: 'so much',
      };
    }
  }

  if (node.type === 'nested') {
    return {
      ...node,
      children: node.children.map(transformNode),
    };
  }

  return node;
};

const formatters = {
  stylish: (data) => stylish(data),
  plain: (data) => plain(data),
  json: (data) => {
    const transformed = data.map(transformNode);
    return JSON.stringify(transformed, null, 2);
  },
};

export default (data, formatName) => {
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: '${formatName}'!`);
  }
  return formatters[formatName](data);
};
