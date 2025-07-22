#!/usr/bin/env node

import { Command } from 'commander';
import parseFile from './src/parseFile.js'; // Importa la función de análisis

const program = new Command();

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action((filepath1, filepath2, options) => { // Define la acción a ejecutar
    // Lee y analiza el primer archivo
    const data1 = parseFile(filepath1);
    // Lee y analiza el segundo archivo
    const data2 = parseFile(filepath2);

    // Por ahora, solo imprimimos los datos analizados para verificar que funciona
    console.log('Parsed Data from file1:', data1);
    console.log('Parsed Data from file2:', data2);

    // La lógica para comparar estos datos y generar la diferencia
    // se implementará en los siguientes pasos.
  });

program.parse(process.argv); // Procesa los argumentos de la línea de comandos