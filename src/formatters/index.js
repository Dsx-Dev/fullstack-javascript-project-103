// src/formatters/index.js
import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatOutput = (diffTree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(diffTree);
    case 'plain':
      return formatPlain(diffTree);
    case 'json':
      return JSON.stringify(diffTree, null, 2); // <--- Añade este caso
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};

export default formatOutput;