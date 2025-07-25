#!/usr/bin/env node

import { Command } from 'commander';
import { fileURLToPath } from 'url';
import genDiff from './src/gendiff.js'; // Importa la función genDiff del archivo src

const program = new Command();

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action((filepath1, filepath2, options) => {
    try {
      const result = genDiff(filepath1, filepath2, options.format);
      console.log(result);
    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }
  });

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  program.parse(process.argv);
}

export default genDiff;