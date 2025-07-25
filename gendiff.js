#!/usr/bin/env node

import { Command } from 'commander';
// No importaremos parseFile ni genDiff aquí directamente por ahora,
// serán parte de una nueva función principal.

// =========================================================================
// PASO CLAVE: Crear una función principal 'gendiff' que haga todo el trabajo.
// Por ahora, solo es un placeholder. La implementaremos de verdad después.
// Esta función ES LA QUE VAMOS A PROBAR.
const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  // **PENDIENTE: Aquí irá la lógica de leer, comparar y formatear.**
  // Por ahora, para que la prueba pueda compilar, puedes devolver un string vacío
  // o un mensaje temporal. Lo importante es que esta función exista y sea exportada.
  console.log(`Comparando: ${filepath1} y ${filepath2} con formato ${formatName}`);
  return 'Not Implemented Yet'; // Esto fallará la prueba, ¡lo cual es bueno en TDD!
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
    // La acción del CLI ahora llamará a nuestra nueva función principal
    const result = gendiff(filepath1, filepath2, options.format);
    console.log(result); // Y luego imprime su resultado
  });

program.parse(process.argv);

// =========================================================================
// ¡IMPORTANTE! Exporta la función principal para que Jest pueda probarla.
export default gendiff;
// =========================================================================