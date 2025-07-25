import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import gendiff from '../gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const json1Path = getFixturePath('file1.json');
const json2Path = getFixturePath('file2.json');

// NOTA: Esta salida esperada está ORDENADA ALFABÉTICAMENTE para coincidir con tu código.
const expectedStylishDiff = `{
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
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
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
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

describe('gendiff CLI with nested structures', () => {
  test('should compare nested JSON files and return stylish output', () => {
    const result = gendiff(json1Path, json2Path, 'stylish');
    expect(result).toEqual(expectedStylishDiff);
  });
});