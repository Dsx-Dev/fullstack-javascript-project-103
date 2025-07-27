import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormatter from './jsonFormatter.js';

const formatters = {
  stylish: (data) => stylish(data),
  plain: (data) => plain(data),
  json: (data) => jsonFormatter(data),
};

export default (data, formatName) => {
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: '${formatName}'!`);
  }
  return formatters[formatName](data);
};