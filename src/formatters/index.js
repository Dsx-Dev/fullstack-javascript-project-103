import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish: (data) => stylish(data),
  plain: (data) => plain(data),
  json: (data) => JSON.stringify(data, null, 2),
};

export default (data, formatName) => {
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: '${formatName}'!`);
  }
  return formatters[formatName](data);
};