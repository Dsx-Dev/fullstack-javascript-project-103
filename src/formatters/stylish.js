// src/formatters/stylish.js

// Función auxiliar para formatear los valores de forma recursiva
const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value; // Devuelve el valor tal cual si no es un objeto
  }

  const indent = '    '.repeat(depth); // Indentación para la profundidad actual
  const bracketIndent = '    '.repeat(depth - 1);

  const lines = Object.entries(value).map(([key, val]) => {
    return `${indent}${key}: ${stringify(val, depth + 1)}`;
  });

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

// Función principal para formatear el árbol de diferencias
const formatStylish = (diffTree, depth = 1) => {
  // Indentación para el nivel actual
  const indent = '    '.repeat(depth - 1);
  const diffIndent = '  '.repeat(depth - 1);

  const lines = diffTree.map((node) => {
    switch (node.type) {
      case 'added':
        return `${diffIndent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'deleted':
        return `${diffIndent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'changed':
        // Para valores cambiados, mostramos la versión eliminada y la añadida
        return `${diffIndent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}\n${diffIndent}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`;
      case 'nested':
        // Si el nodo es anidado, llamamos a la función de forma RECURSIVA
        const childrenString = formatStylish(node.children, depth + 1);
        return `${indent}  ${node.key}: ${childrenString}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${indent}}`;
};

export default formatStylish;