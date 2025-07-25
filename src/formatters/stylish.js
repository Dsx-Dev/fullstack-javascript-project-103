// src/formatters/stylish.js
const indent = '  '; // Dos espacios para la indentación de los elementos sin cambios

const formatStylish = (diffTree) => {
  const lines = diffTree.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${node.value}`;
      case 'deleted':
        return `${indent}- ${node.key}: ${node.value}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${node.value}`;
      case 'changed':
        // Para valores cambiados, mostramos la versión eliminada y la añadida
        return `${indent}- ${node.key}: ${node.oldValue}\n${indent}+ ${node.key}: ${node.newValue}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default formatStylish;