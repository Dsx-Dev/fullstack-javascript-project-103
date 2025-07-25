// src/parsers/index.js
import { readFileSync } from 'fs';
import { extname } from 'path';
import yaml from 'js-yaml'; // Importa la librería js-yaml

const parseFile = (filepath) => {
  const fileContent = readFileSync(filepath, 'utf-8');
  const fileExtension = extname(filepath);

  switch (fileExtension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      // Usa la librería yaml para cargar el contenido
      return yaml.load(fileContent);
    default:
      throw new Error(`Unknown file extension: ${fileExtension}`);
  }
};

export default parseFile;