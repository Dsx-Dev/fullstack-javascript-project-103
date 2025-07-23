#!/usr/bin/env node

import { Command } from 'commander';
import parseFile from './src/parseFile.js';
import genDiff from './src/genDiff.js'; // ¡Importa la nueva función!

const program = new Command();

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action((filepath1, filepath2, options) => {
    // 1. Lee y analiza los archivos (esto ya lo tienes hecho)
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);

    // 2. ¡Compara los datos!
    const diffTree = genDiff(data1, data2);

    // 3. Imprime el resultado de la comparación (el "árbol de diferencias")
    console.log(diffTree);
  });

program.parse(process.argv);