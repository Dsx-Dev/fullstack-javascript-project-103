// __tests__/gendiff.test.js

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// IMPORTANTE: Ahora importamos la función 'gendiff' PRINCIPAL
// que exportamos desde el archivo 'gendiff.js' en la raíz.
import gendiff from '../gendiff.js'; // Ajusta la ruta si tu gendiff.js está en otro lugar

// Helper para obtener __dirname equivalente en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

// Rutas a tus archivos JSON de prueba
const json1Path = getFixturePath('file1.json');
const json2Path = getFixturePath('file2.json');

// Rutas a tus nuevos archivos YAML de prueba
const yml1Path = getFixturePath('file1.yml');
const yml2Path = getFixturePath('file2.yml');

// =========================================================================
// Define la SALIDA ESPERADA para el formato 'stylish'.
// Esta es la cadena de texto exacta que tu programa debería imprimir.
// La indentación y los símbolos (+, -, sin símbolo) son CRUCIALES.
const expectedStylishDiff = `{
  - follow: false
    host: codica.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
// =========================================================================

describe('gendiff CLI', () => {
  // Prueba para archivos JSON (la que ya tenías, pero ahora esperando la salida formateada)
  test('should compare flat JSON files and return stylish output', () => {
    // Llama a la función principal 'gendiff' con las rutas a los archivos
    // y el formato por defecto ('stylish').
    const result = gendiff(json1Path, json2Path, 'stylish');
    expect(result).toEqual(expectedStylishDiff);
  });

  // NUEVA PRUEBA: Para archivos YAML
  test('should compare flat YAML files and return stylish output', () => {
    // Llama a la función principal 'gendiff' con las rutas a los archivos YAML
    const result = gendiff(yml1Path, yml2Path, 'stylish');
    expect(result).toEqual(expectedStylishDiff); // Debería ser la misma salida formateada
  });

  // Puedes añadir más pruebas aquí en el futuro:
  // - Archivos con objetos anidados
  // - Diferentes formatos de salida (plain, json - cuando los implementes)
  // - Archivos con claves que contienen números o caracteres especiales
  // - Casos de errores (ej. archivo no encontrado)
});