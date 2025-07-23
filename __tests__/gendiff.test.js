import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


import genDiff from '../src/genDiff.js';
// Estas líneas construyen una versión de '__dirname' para módulos ESM.
// Te permiten construir rutas como: 'tu-proyecto/__fixtures__/file1.json'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Función auxiliar que te ayuda a obtener la ruta completa a un archivo en '__fixtures__'.
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

// Estas son las rutas a tus archivos de ejemplo JSON.
// Aunque para esta prueba usaremos los datos parseados directamente,
// esta configuración es útil si quisieras leer los archivos dentro de la prueba.
const file1Path = getFixturePath('file1.json');
const file2Path = getFixturePath('file2.json');

// Aquí definimos los objetos JavaScript que representan el contenido
// de file1.json y file2.json *después de que parseFile los haya procesado*.
// Jest le pasará estos objetos directamente a tu función genDiff.
const parsedData1 = {
  "host": "codica.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
};

const parsedData2 = {
  "timeout": 20,
  "verbose": true,
  "host": "codica.io"
};

// Este es el "árbol de diferencias" exacto que tu función genDiff
// debería producir cuando compara parsedData1 y parsedData2.
// Jest comparará el resultado REAL de tu función con este resultado ESPERADO.
// ¡Es crucial que este array sea idéntico al que genera tu genDiff!
const expectedFlatDiff = [
  { key: 'follow', type: 'deleted', value: false },
  { key: 'host', type: 'unchanged', value: 'codica.io' },
  { key: 'proxy', type: 'deleted', value: '123.234.53.22' },
  { key: 'timeout', type: 'changed', oldValue: 50, newValue: 20 },
  { key: 'verbose', type: 'added', value: true },
];



// 'describe' es una forma de agrupar pruebas relacionadas.
// Piensa en ello como una "categoría" para tus pruebas.
// 'genDiff function' es el nombre de esta categoría.
describe('genDiff function', () => {

  // 'test' (o 'it') define una prueba individual.
  // El primer argumento es una descripción CLARA de lo que esta prueba verifica.
  test('should compare flat JSON files correctly', () => {

    // Paso A: Ejecutar la función que estamos probando.
    // Llamamos a tu función 'genDiff' con los datos de entrada.
    const result = genDiff(parsedData1, parsedData2);

       // 'expect(result)' toma el resultado real de tu función.
    // '.toEqual(expectedFlatDiff)' es un "matcher" de Jest que compara
    // el resultado real con el resultado esperado (comparación profunda de objetos/arrays).
    // Si son idénticos, la prueba PASA. Si son diferentes, la prueba FALLA.
    expect(result).toEqual(expectedFlatDiff);
  });

  // Puedes añadir más bloques 'test' aquí para probar otros escenarios,
  // como objetos vacíos, archivos con solo cambios, etc.
});