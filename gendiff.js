#!/usr/bin/env node

import { Command } from 'commander';
import { fileURLToPath } from 'url';
import parseFile from './src/parsers/index.js';
import genDiffCore from './src/genDiff.js';
import formatStylish from './src/formatters/stylish.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  // Asegúrate de que estas llamadas a parseFile() estén correctas
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const diffTree = genDiffCore(data1, data2);

  if (formatName === 'stylish') {
    return formatStylish(diffTree);
  }

  throw new Error(`Unknown format: ${formatName}`);
};

const program = new Command();

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action((filepath1, filepath2, options) => {
    try {
      const result = gendiff(filepath1, filepath2, options.format);
      console.log(result);
    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }
  });

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  program.parse(process.argv);
}

export default gendiff;