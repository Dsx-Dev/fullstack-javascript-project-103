#!/usr/bin/env node

import { Command } from 'commander';
import { fileURLToPath } from 'url';
import parseFile from './src/parsers/index.js'; // <--- NUEVA IMPORTACIÓN DEL PARSER
import genDiffCore from './src/genDiff.js';    // <--- IMPORTA TU LOGICA CENTRAL DE genDiff
import formatStylish from './src/formatters/stylish.js'; // <--- NUEVA IMPORTACIÓN DEL FORMATEADOR STYLISH

// =========================================================================
// La función principal 'gendiff' que orquesta todo el proceso.
const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  // 1. Leer y parsear los archivos usando el nuevo módulo parsers
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  // 2. Generar el árbol de diferencias usando tu lógica central de genDiff
  const diffTree = genDiffCore(data1, data2);

  // 3. Formatear el árbol de diferencias según el formato solicitado
  // Por ahora, solo tenemos 'stylish'. Si implementas más, aquí habría un 'switch'.
  if (formatName === 'stylish') {
    return formatStylish(diffTree);
  }
  // Puedes añadir un throw new Error('Unknown format') para otros formatos
  return `Unknown format: ${formatName}`;
};
// =========================================================================

const program = new Command();

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action((filepath1, filepath2, options) => {
    const result = gendiff(filepath1, filepath2, options.format);
    console.log(result);
  });

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  program.parse(process.argv);
}

export default gendiff;