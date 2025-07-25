// src/parsers/index.js
import { readFileSync } from 'fs'; // Para leer archivos del sistema
import { extname } from 'path';    // Para obtener la extensión del archivo
import yaml from 'js-yaml';       // Importa la librería js-yaml

const parseFile = (filepath) => {
  const fileContent = readFileSync(filepath, 'utf-8'); // Lee el contenido del archivo
  const fileExtension = extname(filepath); // Obtiene la extensión (ej. '.json', '.yml')

  switch (fileExtension) {
    case '.json':
      return JSON.parse(fileContent); // Usa JSON.parse para archivos JSON
    case '.yml':
    case '.yaml':
      return yaml.load(fileContent); // Usa yaml.load para archivos YAML
    default:
      throw new Error(`Unknown file extension: ${fileExtension}`);
  }
};

export default parseFile;