// src/parsers/index.js
import { readFileSync } from 'fs';
import { extname } from 'path';
import yaml from 'js-yaml';

const parseFile = (filepath) => {
  // Esta línea lee el archivo del disco.
  const fileContent = readFileSync(filepath, 'utf-8'); 
  const fileExtension = extname(filepath);

  switch (fileExtension) {
    case '.json':
      // Asegúrate de que JSON.parse se aplique al contenido del archivo
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return yaml.load(fileContent);
    default:
      throw new Error(`Unknown file extension: ${fileExtension}`);
  }
};

export default parseFile;