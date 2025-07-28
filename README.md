# GenDiff - Calculadora de Diferencias

### Hexlet tests and linter status:
[![hexlet-check](https://github.com/Dsx-Dev/fullstack-javascript-project-103/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Dsx-Dev/fullstack-javascript-project-103/actions/workflows/hexlet-check.yml)

[![Maintainability](https://qlty.sh/gh/Dsx-Dev/projects/fullstack-javascript-project-103/maintainability.svg)](https://qlty.sh/gh/Dsx-Dev/projects/fullstack-javascript-project-103)

## Descripción

GenDiff es una herramienta de línea de comandos que encuentra diferencias entre dos archivos de configuración. Soporta archivos en formato JSON y YAML, y puede mostrar las diferencias en múltiples formatos de salida.

## Características

- 🔍 **Comparación inteligente**: Detecta cambios, adiciones y eliminaciones en archivos de configuración
- 📁 **Múltiples formatos**: Soporta archivos JSON y YAML
- 🎨 **Diferentes formatos de salida**:
  - **Stylish**: Formato visual con símbolos + y - (por defecto)
  - **Plain**: Descripción textual de los cambios
  - **JSON**: Salida estructurada en formato JSON
- 🏗️ **Objetos anidados**: Maneja estructuras complejas y anidadas
- ⚡ **Rápido y eficiente**: Procesamiento optimizado con Lodash

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Dsx-Dev/fullstack-javascript-project-103.git

# Navegar al directorio
cd fullstack-javascript-project-103

# Instalar dependencias
npm install

# Construir el proyecto
npm run build

# Instalar globalmente (opcional)
npm link
```

## Uso

```bash
# Uso básico (formato stylish por defecto)
gendiff <filepath1> <filepath2>

# Especificar formato de salida
gendiff --format <formato> <filepath1> <filepath2>
gendiff -f <formato> <filepath1> <filepath2>

# Ejemplos
gendiff file1.json file2.json
gendiff --format plain config1.yml config2.yml
gendiff -f json before.json after.json
```

### Opciones disponibles

- `-f, --format [type]`: Formato de salida (stylish, plain, json)
- `-h, --help`: Mostrar ayuda
- `-V, --version`: Mostrar versión

## Formatos de salida

### 1. Stylish (por defecto)
```
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
    }
}
```

### 2. Plain
```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
```

### 3. JSON
```json
[
  {
    "key": "common",
    "type": "nested",
    "children": [...]
  }
]
```

## Demostración

Puedes ver el funcionamiento completo de la herramienta en esta grabación:

gendiff --format stylish __fixtures__/file1.json __fixtures__/file2.json
    https://asciinema.org/a/Cy367u6mim2R41H2UXIjvhfpa

 gendiff --format plain __fixtures__/file1.json __fixtures__/file2.json
   https://asciinema.org/a/E6R6RdGQXdY78lvZ68rrITRI1


gendiff --format json __fixtures__/file1.json __fixtures__/file2.json
    https://asciinema.org/a/6slu1vGPk1rR3LrtBxR0Veq44


## Estructura del proyecto

```
├── src/
│   ├── gendiff.js          # Función principal de comparación
│   ├── parsers/
│   │   └── index.js        # Parsers para JSON y YAML
│   └── formatters/
│       ├── index.js        # Selector de formatos
│       ├── stylish.js      # Formato stylish
│       └── plain.js        # Formato plain
├── bin/
│   └── gendiff.js          # CLI ejecutable
├── __tests__/              # Tests automatizados
└── __fixtures__/           # Archivos de prueba
```

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución
- **JavaScript (ES6+)**: Lenguaje principal
- **Lodash**: Utilidades para manipulación de datos
- **js-yaml**: Parser para archivos YAML
- **Commander.js**: Interfaz de línea de comandos
- **Jest**: Framework de testing

## Testing

```bash
# Ejecutar todos los tests
npm test

```

## Desarrollo

Este proyecto fue desarrollado como parte del curriculum de [Hexlet](https://hexlet.io), siguiendo las mejores prácticas de desarrollo en JavaScript y programación funcional.

### Características técnicas:
- ✅ Arquitectura modular y escalable
- ✅ Cobertura completa de tests
- ✅ Linting con ESLint
- ✅ Manejo de errores robusto
- ✅ Documentación completa

## Autor

**Dsx-Dev** - [GitHub](https://github.com/Dsx-Dev)

## Licencia

MIT License - ver el archivo [LICENSE](LICENSE) para más detalles.