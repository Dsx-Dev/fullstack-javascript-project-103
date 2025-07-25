
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import gendiff from '../gendiff.js'; // <--- SOLO IMPORTAMOS ESTA FUNCIÓN

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const json1Path = getFixturePath('file1.json');
const json2Path = getFixturePath('file2.json');
// Si ya creaste tus fixtures YAML anidadas, puedes descomentar estas líneas
// const yml1Path = getFixturePath('file1.yml');
// const yml2Path = getFixturePath('file2.yml');

// =========================================================================
// Define la SALIDA ESPERADA para el formato 'stylish' CON ANIDAMIENTO.
// La indentación, los espacios y los saltos de línea son CRUCIALES.
const expectedStylishDiff = `{
  - group2: {
      deep: {
          id: 45
      }
      abc: 12345
    }
  + group3: {
      deep: {
          id: {
              number: 45
          }
      }
      fee: 100500
    }
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
          key5: value5
        }
        setting6: {
          - doge: {
              wow: 
            }
          + doge: {
              wow: so much
            }
          + ops: vops
          key: value
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
          key: value
        }
      + nest: str
    }
}`;
// =========================================================================

describe('gendiff CLI with nested structures', () => {

  test('should compare nested JSON files and return stylish output', () => {
    const result = gendiff(json1Path, json2Path, 'stylish');
    expect(result).toEqual(expectedStylishDiff);
  });

  // Puedes añadir la prueba para YAML anidado una vez que crees los fixtures correspondientes
  // test('should compare nested YAML files and return stylish output', () => {
  //   const result = gendiff(yml1Path, yml2Path, 'stylish');
  //   expect(result).toEqual(expectedStylishDiff);
  // });
});