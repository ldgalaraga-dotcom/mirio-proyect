/**
 * ============================================================================
 * CURSO DE PYTHON PARA PRINCIPIANTES — EDUCACIÓN MEDIA
 * ============================================================================
 * Curso estructurado por niveles (Básico → Intermedio) pensado para
 * estudiantes de bachillerato (educación media) sin experiencia previa
 * en programación.
 *
 * Este archivo define el contenido completo del curso en JavaScript puro,
 * listo para ser consumido por una app, un sitio web educativo, un LMS
 * o para exportarse a un documento.
 * ============================================================================
 */

// ============================================================================
// MODELO DE DATOS (referencia, documentado con JSDoc)
// ============================================================================

/**
 * @typedef {Object} RecursoApoyo
 * @property {"video"|"lectura"|"herramienta"|"documentacion"} tipo
 * @property {string} titulo
 * @property {string} descripcion
 * @property {string} [enlaceSugerido] - El docente puede reemplazarlo por el recurso institucional real
 */

/**
 * @typedef {Object} Ejercicio
 * @property {string} titulo
 * @property {string} enunciado
 * @property {"fácil"|"media"|"alta"} dificultad
 * @property {string} [entradaEjemplo]
 * @property {string} [salidaEsperada]
 */

/**
 * @typedef {Object} Evaluacion
 * @property {"quiz"|"taller"|"proyecto"|"autoevaluación"} tipo
 * @property {string} descripcion
 * @property {string[]} criterios
 * @property {number} porcentaje - % dentro del nivel
 */

/**
 * @typedef {Object} Leccion
 * @property {string} id
 * @property {string} titulo
 * @property {number} duracionMinutos
 * @property {string[]} objetivos
 * @property {string[]} temas
 * @property {string[]} conceptosClave
 * @property {string} ejemploCodigo
 * @property {Ejercicio[]} ejercicios
 * @property {RecursoApoyo[]} [recursos]
 */

/**
 * @typedef {Object} Modulo
 * @property {string} id
 * @property {string} titulo
 * @property {string} descripcion
 * @property {number} semanasEstimadas
 * @property {Leccion[]} lecciones
 * @property {Evaluacion} evaluacion
 */

/**
 * @typedef {Object} Nivel
 * @property {"Básico"|"Intermedio"} nombre
 * @property {string} descripcion
 * @property {number} duracionEstimadaSemanas
 * @property {string[]} prerrequisitos
 * @property {string[]} objetivosGenerales
 * @property {Modulo[]} modulos
 */

/**
 * @typedef {Object} Curso
 * @property {string} titulo
 * @property {string} publicoObjetivo
 * @property {string} modalidad
 * @property {number} duracionTotalSemanas
 * @property {string} intensidadHorariaSemanal
 * @property {string[]} herramientas
 * @property {string[]} metodologia
 * @property {string[]} competenciasFinales
 * @property {Nivel[]} niveles
 */

// ============================================================================
// CONTENIDO DEL CURSO
// ============================================================================

/** @type {Curso} */
const cursoPythonPrincipiantes = {
  titulo: "Introducción a la Programación con Python",
  publicoObjetivo:
    "Estudiantes de educación media (bachillerato) sin experiencia previa en programación",
  modalidad: "Presencial con apoyo de material digital / también adaptable a modalidad virtual",
  duracionTotalSemanas: 16,
  intensidadHorariaSemanal: "2 horas de clase + 1 hora de práctica autónoma",
  herramientas: [
    "Python 3.x",
    "Thonny o Replit (entorno amigable para principiantes)",
    "Visual Studio Code (opcional, para estudiantes más avanzados)",
    "Google Colab (para prácticas sin instalación)",
  ],
  metodologia: [
    "Aprender haciendo: cada concepto se acompaña de código en vivo",
    "Ejercicios cortos al final de cada lección para fijar el concepto",
    "Proyectos integradores al cierre de cada módulo",
    "Trabajo colaborativo en parejas (pair programming) para resolución de problemas",
    "Gamificación: retos con puntaje y insignias por nivel superado",
  ],
  competenciasFinales: [
    "Comprender y aplicar la lógica de programación básica",
    "Escribir programas en Python usando variables, condicionales y ciclos",
    "Diseñar y usar funciones para organizar código reutilizable",
    "Manipular estructuras de datos como listas, tuplas y diccionarios",
    "Leer y escribir archivos de texto simples",
    "Aplicar manejo de errores y buenas prácticas de programación",
    "Desarrollar un proyecto final funcional que resuelva un problema real",
  ],

  niveles: [
    // ========================================================================
    // NIVEL BÁSICO
    // ========================================================================
    {
      nombre: "Básico",
      descripcion:
        "Introduce los fundamentos de la programación y la sintaxis de Python desde cero.",
      duracionEstimadaSemanas: 8,
      prerrequisitos: ["Ninguno. Solo manejo básico de computador."],
      objetivosGenerales: [
        "Familiarizarse con el entorno de programación",
        "Comprender qué es un algoritmo y cómo se traduce a código",
        "Escribir programas simples usando variables, condicionales y ciclos",
      ],
      modulos: [
        {
          id: "B1",
          titulo: "Primeros pasos con Python",
          descripcion:
            "Instalación, entorno de trabajo y primer contacto con el código.",
          semanasEstimadas: 2,
          lecciones: [
            {
              id: "B1L1",
              titulo: "¿Qué es programar? Instalación y entorno",
              duracionMinutos: 90,
              objetivos: [
                "Entender qué es un algoritmo y un lenguaje de programación",
                "Instalar y configurar Python y el entorno de trabajo",
              ],
              temas: [
                "Qué es un algoritmo",
                "Historia y usos de Python",
                "Instalación de Python y Thonny/Replit",
                "Primer programa: print('Hola mundo')",
              ],
              conceptosClave: ["Algoritmo", "Intérprete", "Sintaxis", "Comentarios"],
              ejemploCodigo:
                "# Mi primer programa en Python\nprint('¡Hola, mundo!')\nprint('Estoy aprendiendo a programar')",
              ejercicios: [
                {
                  titulo: "Presentación personal",
                  enunciado:
                    "Escribe un programa que imprima tu nombre, tu edad y tu materia favorita en tres líneas distintas.",
                  dificultad: "fácil",
                },
              ],
              recursos: [
                {
                  tipo: "herramienta",
                  titulo: "Replit",
                  descripcion: "Entorno en línea para programar sin instalar nada",
                },
              ],
            },
            {
              id: "B1L2",
              titulo: "Variables y tipos de datos",
              duracionMinutos: 90,
              objetivos: [
                "Declarar y usar variables",
                "Reconocer los tipos de datos básicos de Python",
              ],
              temas: [
                "Variables y asignación",
                "Tipos de datos: int, float, str, bool",
                "Función input() para recibir datos del usuario",
                "Conversión de tipos (casting)",
              ],
              conceptosClave: ["Variable", "Tipo de dato", "Casting", "input/print"],
              ejemploCodigo:
                "nombre = input('¿Cómo te llamas? ')\nedad = int(input('¿Cuántos años tienes? '))\nprint(f'Hola {nombre}, el próximo año tendrás {edad + 1} años')",
              ejercicios: [
                {
                  titulo: "Calculadora de edad en meses",
                  enunciado:
                    "Pide la edad en años al usuario y muestra a cuántos meses equivale.",
                  dificultad: "fácil",
                  entradaEjemplo: "15",
                  salidaEsperada: "180",
                },
              ],
            },
          ],
          evaluacion: {
            tipo: "taller",
            descripcion: "Taller práctico de variables y entrada/salida de datos",
            criterios: [
              "Usa variables con nombres claros",
              "Convierte correctamente los tipos de datos",
              "El programa se ejecuta sin errores",
            ],
            porcentaje: 10,
          },
        },
        {
          id: "B2",
          titulo: "Operadores y control de flujo",
          descripcion:
            "Toma de decisiones en el código mediante condicionales y operadores.",
          semanasEstimadas: 2,
          lecciones: [
            {
              id: "B2L1",
              titulo: "Operadores aritméticos, relacionales y lógicos",
              duracionMinutos: 90,
              objetivos: [
                "Aplicar operadores matemáticos en expresiones",
                "Construir condiciones usando operadores relacionales y lógicos",
              ],
              temas: [
                "Operadores aritméticos (+, -, *, /, //, %, **)",
                "Operadores relacionales (==, !=, >, <, >=, <=)",
                "Operadores lógicos (and, or, not)",
              ],
              conceptosClave: ["Precedencia de operadores", "Expresión booleana"],
              ejemploCodigo:
                "nota1 = 4.5\nnota2 = 3.8\npromedio = (nota1 + nota2) / 2\naprobado = promedio >= 3.0\nprint(f'Promedio: {promedio}, ¿Aprobado?: {aprobado}')",
              ejercicios: [
                {
                  titulo: "Promedio de notas",
                  enunciado:
                    "Calcula el promedio de 3 notas y determina si el estudiante aprueba (promedio >= 3.0).",
                  dificultad: "fácil",
                },
              ],
            },
            {
              id: "B2L2",
              titulo: "Condicionales: if, elif, else",
              duracionMinutos: 100,
              objetivos: [
                "Estructurar decisiones en el código con condicionales",
                "Anidar condiciones cuando sea necesario",
              ],
              temas: [
                "Estructura if / elif / else",
                "Condiciones anidadas",
                "Buenas prácticas de indentación",
              ],
              conceptosClave: ["Bloque de código", "Indentación", "Flujo condicional"],
              ejemploCodigo:
                "nota = float(input('Ingresa tu nota: '))\nif nota >= 4.5:\n    print('Excelente')\nelif nota >= 3.0:\n    print('Aprobado')\nelse:\n    print('Reprobado')",
              ejercicios: [
                {
                  titulo: "Clasificador de IMC",
                  enunciado:
                    "Pide peso y estatura, calcula el IMC y clasifica el resultado en bajo peso, normal, sobrepeso u obesidad.",
                  dificultad: "media",
                },
              ],
            },
          ],
          evaluacion: {
            tipo: "quiz",
            descripcion: "Quiz de operadores y estructuras condicionales",
            criterios: [
              "Identifica el operador correcto para cada situación",
              "Construye condicionales anidados correctamente",
            ],
            porcentaje: 10,
          },
        },
        {
          id: "B3",
          titulo: "Ciclos y repetición",
          descripcion: "Automatización de tareas repetitivas con bucles.",
          semanasEstimadas: 2,
          lecciones: [
            {
              id: "B3L1",
              titulo: "Ciclo while",
              duracionMinutos: 90,
              objetivos: ["Comprender la lógica de repetición controlada por condición"],
              temas: ["Estructura while", "Contadores y acumuladores", "break y continue"],
              conceptosClave: ["Bucle", "Condición de parada", "Iteración"],
              ejemploCodigo:
                "contador = 1\nwhile contador <= 5:\n    print(f'Repetición número {contador}')\n    contador += 1",
              ejercicios: [
                {
                  titulo: "Adivina el número",
                  enunciado:
                    "Genera un número aleatorio del 1 al 10 y permite que el usuario intente adivinarlo hasta acertar.",
                  dificultad: "media",
                },
              ],
            },
            {
              id: "B3L2",
              titulo: "Ciclo for y la función range()",
              duracionMinutos: 90,
              objetivos: [
                "Recorrer rangos y secuencias con for",
                "Combinar ciclos con condicionales",
              ],
              temas: ["Estructura for", "Función range()", "Recorrido de cadenas de texto"],
              conceptosClave: ["Iterable", "Rango", "Recorrido secuencial"],
              ejemploCodigo:
                "total = 0\nfor numero in range(1, 11):\n    total += numero\nprint(f'La suma del 1 al 10 es {total}')",
              ejercicios: [
                {
                  titulo: "Tabla de multiplicar",
                  enunciado:
                    "Pide un número y muestra su tabla de multiplicar del 1 al 10.",
                  dificultad: "fácil",
                },
              ],
            },
          ],
          evaluacion: {
            tipo: "proyecto",
            descripcion: "Mini proyecto: juego de adivinanza con ciclos",
            criterios: [
              "Usa correctamente while o for según el caso",
              "Controla el flujo con break/continue cuando aplica",
              "El programa maneja bien la interacción con el usuario",
            ],
            porcentaje: 15,
          },
        },
      ],
    },

    // ========================================================================
    // NIVEL INTERMEDIO
    // ========================================================================
    {
      nombre: "Intermedio",
      descripcion:
        "Profundiza en estructuras de datos, funciones y manejo de archivos, preparando al estudiante para resolver problemas más complejos.",
      duracionEstimadaSemanas: 8,
      prerrequisitos: [
        "Haber aprobado el nivel Básico",
        "Manejo de variables, condicionales y ciclos",
      ],
      objetivosGenerales: [
        "Organizar el código en funciones reutilizables",
        "Manipular estructuras de datos complejas (listas, tuplas, diccionarios)",
        "Leer y escribir archivos, y manejar errores de forma controlada",
        "Desarrollar un proyecto final que integre todos los conceptos del curso",
      ],
      modulos: [
        {
          id: "I1",
          titulo: "Funciones y modularización",
          descripcion: "Organización del código en bloques reutilizables.",
          semanasEstimadas: 2,
          lecciones: [
            {
              id: "I1L1",
              titulo: "Definición y uso de funciones",
              duracionMinutos: 100,
              objetivos: [
                "Definir funciones con parámetros y valores de retorno",
                "Comprender el alcance (scope) de las variables",
              ],
              temas: [
                "Sintaxis def y return",
                "Parámetros y argumentos",
                "Parámetros por defecto",
                "Variables locales vs. globales",
              ],
              conceptosClave: ["Función", "Parámetro", "Retorno", "Scope"],
              ejemploCodigo:
                "def calcular_promedio(nota1, nota2, nota3):\n    return (nota1 + nota2 + nota3) / 3\n\nresultado = calcular_promedio(4.0, 3.5, 4.5)\nprint(f'El promedio es {resultado}')",
              ejercicios: [
                {
                  titulo: "Conversor de temperatura",
                  enunciado:
                    "Crea una función que convierta grados Celsius a Fahrenheit y otra que haga la conversión inversa.",
                  dificultad: "media",
                },
              ],
            },
            {
              id: "I1L2",
              titulo: "Funciones con listas de argumentos y recursividad básica",
              duracionMinutos: 90,
              objetivos: [
                "Usar *args para funciones con número variable de argumentos",
                "Comprender la idea de una función recursiva simple",
              ],
              temas: ["*args y **kwargs (nivel introductorio)", "Recursividad: caso base y caso recursivo"],
              conceptosClave: ["Argumentos variables", "Recursividad", "Caso base"],
              ejemploCodigo:
                "def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))",
              ejercicios: [
                {
                  titulo: "Suma de una lista de números variables",
                  enunciado:
                    "Crea una función que reciba una cantidad variable de números y devuelva su suma total.",
                  dificultad: "media",
                },
              ],
            },
          ],
          evaluacion: {
            tipo: "taller",
            descripcion: "Taller de diseño de funciones",
            criterios: [
              "Las funciones tienen una única responsabilidad clara",
              "Uso correcto de parámetros y retorno",
              "Código limpio y comentado",
            ],
            porcentaje: 15,
          },
        },
        {
          id: "I2",
          titulo: "Estructuras de datos: listas, tuplas y diccionarios",
          descripcion: "Almacenamiento y manipulación de colecciones de datos.",
          semanasEstimadas: 3,
          lecciones: [
            {
              id: "I2L1",
              titulo: "Listas y sus métodos",
              duracionMinutos: 100,
              objetivos: [
                "Crear, recorrer y modificar listas",
                "Aplicar métodos comunes de listas",
              ],
              temas: [
                "Creación e indexación de listas",
                "Métodos: append, remove, sort, insert, pop",
                "Listas por comprensión (introducción)",
                "Slicing (rebanado) de listas",
              ],
              conceptosClave: ["Lista", "Índice", "Slicing", "Mutabilidad"],
              ejemploCodigo:
                "calificaciones = [4.5, 3.2, 2.8, 5.0, 3.9]\ncalificaciones.append(4.0)\naprobados = [nota for nota in calificaciones if nota >= 3.0]\nprint(f'Aprobados: {aprobados}')",
              ejercicios: [
                {
                  titulo: "Gestor de lista de estudiantes",
                  enunciado:
                    "Crea un programa que permita agregar, eliminar y mostrar nombres de estudiantes en una lista mediante un menú.",
                  dificultad: "media",
                },
              ],
            },
            {
              id: "I2L2",
              titulo: "Tuplas y diccionarios",
              duracionMinutos: 100,
              objetivos: [
                "Diferenciar tuplas de listas y saber cuándo usar cada una",
                "Manipular diccionarios como estructuras clave-valor",
              ],
              temas: [
                "Tuplas: inmutabilidad y empaquetado/desempaquetado",
                "Diccionarios: claves, valores, métodos keys()/values()/items()",
                "Recorrido de diccionarios con for",
              ],
              conceptosClave: ["Tupla", "Diccionario", "Clave-valor", "Inmutabilidad"],
              ejemploCodigo:
                "estudiante = {\n    'nombre': 'Ana',\n    'grado': '10°',\n    'notas': [4.5, 3.8, 4.0]\n}\npromedio = sum(estudiante['notas']) / len(estudiante['notas'])\nprint(f\"{estudiante['nombre']} tiene un promedio de {promedio:.2f}\")",
              ejercicios: [
                {
                  titulo: "Agenda de contactos",
                  enunciado:
                    "Crea un diccionario que almacene contactos (nombre como clave, teléfono como valor) y permite buscar, agregar y eliminar contactos.",
                  dificultad: "media",
                },
              ],
            },
          ],
          evaluacion: {
            tipo: "taller",
            descripcion: "Taller de manipulación de estructuras de datos",
            criterios: [
              "Selecciona la estructura de datos adecuada según el problema",
              "Aplica correctamente los métodos de listas y diccionarios",
            ],
            porcentaje: 15,
          },
        },
        {
          id: "I3",
          titulo: "Archivos y manejo de errores",
          descripcion: "Persistencia de datos y programación robusta.",
          semanasEstimadas: 2,
          lecciones: [
            {
              id: "I3L1",
              titulo: "Lectura y escritura de archivos de texto",
              duracionMinutos: 90,
              objetivos: [
                "Leer y escribir archivos .txt desde Python",
                "Comprender el uso del bloque with",
              ],
              temas: [
                "Apertura de archivos: modos 'r', 'w', 'a'",
                "Uso de with open(...) as archivo",
                "Lectura línea por línea",
              ],
              conceptosClave: ["Archivo", "Modo de apertura", "Persistencia de datos"],
              ejemploCodigo:
                "with open('notas.txt', 'w') as archivo:\n    archivo.write('Ana: 4.5\\n')\n    archivo.write('Luis: 3.8\\n')\n\nwith open('notas.txt', 'r') as archivo:\n    for linea in archivo:\n        print(linea.strip())",
              ejercicios: [
                {
                  titulo: "Registro de asistencia",
                  enunciado:
                    "Crea un programa que guarde en un archivo de texto el nombre de los estudiantes que asistieron a clase.",
                  dificultad: "media",
                },
              ],
            },
            {
              id: "I3L2",
              titulo: "Manejo de errores con try/except",
              duracionMinutos: 90,
              objetivos: [
                "Anticipar y manejar errores comunes en tiempo de ejecución",
                "Escribir programas más robustos ante entradas inválidas",
              ],
              temas: [
                "Bloques try/except/finally",
                "Tipos de excepciones comunes (ValueError, ZeroDivisionError, FileNotFoundError)",
                "Validación de datos de entrada",
              ],
              conceptosClave: ["Excepción", "Manejo de errores", "Robustez del programa"],
              ejemploCodigo:
                "try:\n    numero = int(input('Ingresa un número: '))\n    resultado = 100 / numero\n    print(f'Resultado: {resultado}')\nexcept ValueError:\n    print('Debes ingresar un número válido')\nexcept ZeroDivisionError:\n    print('No se puede dividir entre cero')",
              ejercicios: [
                {
                  titulo: "Calculadora a prueba de errores",
                  enunciado:
                    "Mejora una calculadora básica para que maneje divisiones entre cero y entradas no numéricas sin detener el programa.",
                  dificultad: "media",
                },
              ],
            },
          ],
          evaluacion: {
            tipo: "quiz",
            descripcion: "Quiz de manejo de archivos y excepciones",
            criterios: [
              "Identifica el tipo de excepción adecuado para cada error",
              "Aplica correctamente la lectura/escritura de archivos",
            ],
            porcentaje: 10,
          },
        },
        {
          id: "I4",
          titulo: "Proyecto final integrador",
          descripcion:
            "Aplicación de todos los conceptos del curso en un proyecto funcional y significativo.",
          semanasEstimadas: 1,
          lecciones: [
            {
              id: "I4L1",
              titulo: "Diseño y desarrollo del proyecto final",
              duracionMinutos: 180,
              objetivos: [
                "Planificar un proyecto usando variables, condicionales, ciclos, funciones, estructuras de datos y archivos",
                "Presentar y sustentar el proyecto ante el grupo",
              ],
              temas: [
                "Ejemplos de proyecto: gestor de notas del curso, agenda escolar, juego de trivia, sistema de biblioteca simple",
                "Planificación con pseudocódigo antes de programar",
                "Documentación básica del código",
              ],
              conceptosClave: ["Integración de conceptos", "Pensamiento computacional", "Documentación"],
              ejemploCodigo:
                "# Ejemplo de estructura de proyecto: Gestor de notas del curso\ndef menu():\n    print('1. Agregar estudiante')\n    print('2. Registrar nota')\n    print('3. Ver promedio del curso')\n    print('4. Guardar en archivo')\n    print('5. Salir')\n\n# El estudiante completa la lógica de cada opción\n# usando funciones, diccionarios/listas y manejo de archivos",
              ejercicios: [
                {
                  titulo: "Propuesta de proyecto",
                  enunciado:
                    "Redacta una breve propuesta (problema a resolver, funcionalidades, estructuras de datos a usar) antes de comenzar a programar.",
                  dificultad: "alta",
                },
              ],
            },
          ],
          evaluacion: {
            tipo: "proyecto",
            descripcion: "Proyecto final del curso",
            criterios: [
              "El proyecto resuelve un problema real o significativo para el estudiante",
              "Integra al menos: funciones, una estructura de datos y manejo de archivos o errores",
              "El estudiante puede explicar y sustentar su código",
              "Código organizado, comentado y funcional",
            ],
            porcentaje: 35,
          },
        },
      ],
    },
  ],
};

// Exportación compatible tanto con Node.js (CommonJS) como con módulos ES
if (typeof module !== "undefined" && module.exports) {
  module.exports = cursoPythonPrincipiantes;
  module.exports.default = cursoPythonPrincipiantes;
}
