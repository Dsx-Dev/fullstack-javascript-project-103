import { readFileSync } from 'fs';
import { extname } from 'path';
import renderStylishTree from './formatters/stylish.js';
import renderToPlainText from './formatters/plain.js';
import parseFile from './parsers.js';
import buildDiffTree from './treeBuilder.js';

const formatters = {
  json: (data) => JSON.stringify(data, null, 2),
  stylish: renderStylishTree,
  plain: renderToPlainText,
};

const readFile = (filePath) => {
  const content = readFileSync(filePath, 'utf-8');
  const format = extname(filePath).slice(1);
  return parseFile(content, format);
};

export default function genDiff(filepath1, filepath2, formatType = 'stylish') {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const diffTree = buildDiffTree(data1, data2);
  
  const formatter = formatters[formatType];
  if (!formatter) {
    throw new Error(`Format type "${formatType}" is not available.`);
  }

  return formatter(diffTree);
}