import { readFileSync } from 'fs';
import { resolve as pathResolve, extname } from 'path';

const parseFile = (filepath) => {
  // Construye la ruta absoluta del archivo para manejar rutas relativas y absolutas
  const absolutePath = pathResolve(process.cwd(), filepath);

  // Lee el contenido del archivo de forma síncrona
  const fileContent = readFileSync(absolutePath, 'utf-8');

  // Obtiene la extensión del archivo (ej. 'json' de '.json')
  const fileExtension = extname(filepath).slice(1);

  // Analiza el contenido según la extensión (por ahora, solo JSON)
  if (fileExtension === 'json') {
    return JSON.parse(fileContent);
  }

  // Lanza un error si la extensión no es compatible
  throw new Error(`Unsupported file extension: ${fileExtension}`);
};

export default parseFile;