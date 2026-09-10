/**
 * ============================================================================
 * CURSO DE JAVASCRIPT PARA PRINCIPIANTES — EDUCACIÓN MEDIA
 * ============================================================================
 * Curso estructurado por niveles (Básico → Intermedio) pensado para
 * estudiantes de bachillerato (educación media) sin experiencia previa
 * en programación con JavaScript.
 * ============================================================================
 */

export type NombreNivel = "Básico" | "Intermedio";

export interface RecursoApoyo {
  tipo: "video" | "lectura" | "herramienta" | "documentacion";
  titulo: string;
  descripcion: string;
  enlaceSugerido?: string;
}

export interface Ejercicio {
  titulo: string;
  enunciado: string;
  dificultad: "fácil" | "media" | "alta";
  entradaEjemplo?: string;
  salidaEsperada?: string;
}

export interface Evaluacion {
  tipo: "quiz" | "taller" | "proyecto" | "autoevaluación";
  descripcion: string;
  criterios: string[];
  porcentaje: number;
}

export interface Leccion {
  id: string;
  titulo: string;
  duracionMinutos: number;
  objetivos: string[];
  temas: string[];
  conceptosClave: string[];
  ejemploCodigo: string;
  ejercicios: Ejercicio[];
  recursos?: RecursoApoyo[];
}

export interface Modulo {
  id: string;
  titulo: string;
  descripcion: string;
  semanasEstimadas: number;
  lecciones: Leccion[];
  evaluacion: Evaluacion;
}

export interface Nivel {
  nombre: NombreNivel;
  descripcion: string;
  duracionEstimadaSemanas: number;
  prerrequisitos: string[];
  objetivosGenerales: string[];
  modulos: Modulo[];
}

export interface Curso {
  titulo: string;
  publicoObjetivo: string;
  modalidad: string;
  duracionTotalSemanas: number;
  intensidadHorariaSemanal: string;
  herramientas: string[];
  metodologia: string[];
  competenciasFinales: string[];
  niveles: Nivel[];
}

// ============================================================================
// CONTENIDO DEL CURSO
// ============================================================================

export const cursoJavaScriptPrincipiantes: Curso = {
  titulo: "Introducción a la Programación con JavaScript",
  publicoObjetivo:
    "Estudiantes de educación media (bachillerato) sin experiencia previa en programación web",
  modalidad: "Presencial con apoyo de material digital / también adaptable a modalidad virtual",
  duracionTotalSemanas: 16,
  intensidadHorariaSemanal: "2 horas de clase + 1 hora de práctica autónoma",
  herramientas: [
    "Navegador web moderno (Chrome, Firefox o Edge)",
    "Visual Studio Code",
    "Consola del navegador (DevTools)",
    "CodePen o JSFiddle (para prácticas en línea)",
  ],
  metodologia: [
    "Aprender haciendo: cada concepto se acompaña de código en vivo",
    "Ejercicios cortos al final de cada lección para fijar el concepto",
    "Proyectos integradores al cierre de cada módulo",
    "Trabajo colaborativo en parejas (pair programming) para resolución de problemas",
    "Gamificación: retos con puntaje e insignias por nivel superado",
  ],
  competenciasFinales: [
    "Comprender y aplicar la lógica de programación en JavaScript",
    "Manipular variables, condicionales y ciclos en el navegador",
    "Diseñar y usar funciones para organizar código reutilizable",
    "Trabajar con arrays, objetos y métodos de manipulación de datos",
    "Interactuar con el DOM para crear páginas web dinámicas",
    "Manejar eventos del usuario y formularios",
    "Desarrollar un proyecto final funcional con HTML, CSS y JavaScript",
  ],

  niveles: [
    // ========================================================================
    // NIVEL BÁSICO
    // ========================================================================
    {
      nombre: "Básico",
      descripcion:
        "Introduce los fundamentos de JavaScript y la programación desde cero, trabajando directamente en el navegador.",
      duracionEstimadaSemanas: 8,
      prerrequisitos: ["Ninguno. Solo manejo básico de computador y navegador web."],
      objetivosGenerales: [
        "Familiarizarse con la consola del navegador y el entorno de desarrollo",
        "Comprender variables, tipos de datos y operadores",
        "Escribir programas simples usando condicionales y ciclos",
      ],
      modulos: [
        {
          id: "B1",
          titulo: "Primeros pasos con JavaScript",
          descripcion:
            "Introducción al lenguaje, la consola del navegador y los primeros scripts.",
          semanasEstimadas: 2,
          lecciones: [
            {
              id: "B1L1",
              titulo: "¿Qué es JavaScript? Tu primer script",
              duracionMinutos: 90,
              objetivos: [
                "Entender qué es JavaScript y para qué se usa",
                "Usar la consola del navegador para ejecutar código",
              ],
              temas: [
                "Qué es JavaScript y su historia",
                "JavaScript en la web: front-end y back-end",
                "La consola del navegador (DevTools)",
                "Primer script: console.log('Hola mundo')",
              ],
              conceptosClave: ["Script", "Consola", "console.log", "Comentarios"],
              ejemploCodigo:
                '// Mi primer programa en JavaScript\nconsole.log("¡Hola, mundo!");\nconsole.log("Estoy aprendiendo JavaScript");',
              ejercicios: [
                {
                  titulo: "Presentación personal",
                  enunciado:
                    "Escribe un programa que imprima tu nombre, tu edad y tu materia favorita usando console.log().",
                  dificultad: "fácil",
                },
              ],
              recursos: [
                {
                  tipo: "herramienta",
                  titulo: "Chrome DevTools",
                  descripcion: "Herramienta integrada del navegador para ejecutar JavaScript",
                },
              ],
            },
            {
              id: "B1L2",
              titulo: "Variables y tipos de datos",
              duracionMinutos: 90,
              objetivos: [
                "Declarar variables con let y const",
                "Reconocer los tipos de datos básicos de JavaScript",
              ],
              temas: [
                "Variables: let, const (y por qué evitar var)",
                "Tipos de datos: string, number, boolean, undefined, null",
                "Template literals (plantillas de texto)",
                "typeof para verificar tipos",
              ],
              conceptosClave: ["Variable", "let/const", "Tipo de dato", "Template literal"],
              ejemploCodigo:
                'const nombre = "Ana";\nlet edad = 15;\nconst esEstudiante = true;\n\nconsole.log(`Hola ${nombre}, tienes ${edad} años`);\nconsole.log(`El próximo año tendrás ${edad + 1} años`);',
              ejercicios: [
                {
                  titulo: "Calculadora de edad en meses",
                  enunciado:
                    "Declara una variable con tu edad en años y muestra a cuántos meses equivale.",
                  dificultad: "fácil",
                  entradaEjemplo: "15",
                  salidaEsperada: "180",
                },
              ],
            },
          ],
          evaluacion: {
            tipo: "taller",
            descripcion: "Taller práctico de variables y console.log",
            criterios: [
              "Usa let y const correctamente",
              "Aplica template literals para formatear texto",
              "El programa se ejecuta sin errores en la consola",
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
              titulo: "Operadores aritméticos, de comparación y lógicos",
              duracionMinutos: 90,
              objetivos: [
                "Aplicar operadores matemáticos en expresiones",
                "Construir condiciones usando operadores de comparación y lógicos",
              ],
              temas: [
                "Operadores aritméticos (+, -, *, /, %, **)",
                "Operadores de comparación (===, !==, >, <, >=, <=)",
                "Operadores lógicos (&&, ||, !)",
                "Diferencia entre == y === (igualdad estricta)",
              ],
              conceptosClave: ["Precedencia de operadores", "Igualdad estricta", "Expresión booleana"],
              ejemploCodigo:
                'const nota1 = 4.5;\nconst nota2 = 3.8;\nconst promedio = (nota1 + nota2) / 2;\nconst aprobado = promedio >= 3.0;\n\nconsole.log(`Promedio: ${promedio}`);\nconsole.log(`¿Aprobado?: ${aprobado}`);',
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
              titulo: "Condicionales: if, else if, else",
              duracionMinutos: 100,
              objetivos: [
                "Estructurar decisiones en el código con condicionales",
                "Usar el operador ternario para condiciones simples",
              ],
              temas: [
                "Estructura if / else if / else",
                "Operador ternario (condición ? valor1 : valor2)",
                "Switch/case para múltiples opciones",
              ],
              conceptosClave: ["Bloque de código", "Flujo condicional", "Operador ternario"],
              ejemploCodigo:
                'const nota = 4.2;\n\nif (nota >= 4.5) {\n  console.log("Excelente");\n} else if (nota >= 3.0) {\n  console.log("Aprobado");\n} else {\n  console.log("Reprobado");\n}\n\n// Con operador ternario\nconst estado = nota >= 3.0 ? "Aprobado" : "Reprobado";\nconsole.log(estado);',
              ejercicios: [
                {
                  titulo: "Clasificador de IMC",
                  enunciado:
                    "Declara variables de peso y estatura, calcula el IMC y clasifica el resultado en bajo peso, normal, sobrepeso u obesidad.",
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
              "Usa === en lugar de == para comparaciones",
              "Construye condicionales correctamente",
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
              titulo: "Ciclo while y do…while",
              duracionMinutos: 90,
              objetivos: ["Comprender la lógica de repetición controlada por condición"],
              temas: ["Estructura while", "Estructura do…while", "Contadores y acumuladores", "break y continue"],
              conceptosClave: ["Bucle", "Condición de parada", "Iteración"],
              ejemploCodigo:
                'let contador = 1;\n\nwhile (contador <= 5) {\n  console.log(`Repetición número ${contador}`);\n  contador++;\n}',
              ejercicios: [
                {
                  titulo: "Cuenta regresiva",
                  enunciado:
                    "Crea un programa que imprima una cuenta regresiva del 10 al 1 y al final imprima '¡Despegue!'.",
                  dificultad: "fácil",
                },
              ],
            },
            {
              id: "B3L2",
              titulo: "Ciclo for y for…of",
              duracionMinutos: 90,
              objetivos: [
                "Usar el ciclo for para iteraciones con contador",
                "Recorrer cadenas y arrays con for…of",
              ],
              temas: ["Estructura for clásico", "for…of para iterables", "Recorrido de cadenas de texto"],
              conceptosClave: ["Iterable", "Índice", "Recorrido secuencial"],
              ejemploCodigo:
                'let total = 0;\n\nfor (let i = 1; i <= 10; i++) {\n  total += i;\n}\n\nconsole.log(`La suma del 1 al 10 es ${total}`);',
              ejercicios: [
                {
                  titulo: "Tabla de multiplicar",
                  enunciado:
                    "Pide un número y muestra su tabla de multiplicar del 1 al 10.",
                  dificultad: "fácil",
                  entradaEjemplo: "7",
                  salidaEsperada: "7 x 1 = 7, 7 x 2 = 14, ..., 7 x 10 = 70",
                },
              ],
            },
          ],
          evaluacion: {
            tipo: "proyecto",
            descripcion: "Mini proyecto: juego de cuenta regresiva con ciclos",
            criterios: [
              "Usa correctamente while o for según el caso",
              "Controla el flujo con break/continue cuando aplica",
              "El programa muestra la salida correcta en consola",
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
        "Profundiza en funciones, arrays, objetos y manipulación del DOM, preparando al estudiante para crear páginas web interactivas.",
      duracionEstimadaSemanas: 8,
      prerrequisitos: [
        "Haber aprobado el nivel Básico",
        "Manejo de variables, condicionales y ciclos",
      ],
      objetivosGenerales: [
        "Organizar el código en funciones reutilizables",
        "Manipular arrays y objetos con métodos modernos",
        "Interactuar con el DOM para crear páginas dinámicas",
        "Desarrollar un proyecto final que integre HTML, CSS y JavaScript",
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
              titulo: "Funciones: declaración, expresión y arrow functions",
              duracionMinutos: 100,
              objetivos: [
                "Definir funciones de distintas formas",
                "Comprender parámetros, retorno y scope",
              ],
              temas: [
                "Declaración de función (function)",
                "Expresiones de función",
                "Arrow functions (=>)",
                "Parámetros por defecto",
                "Scope: let/const y ámbito de bloque",
              ],
              conceptosClave: ["Función", "Arrow function", "Scope", "Parámetro por defecto"],
              ejemploCodigo:
                '// Función tradicional\nfunction calcularPromedio(nota1, nota2, nota3) {\n  return (nota1 + nota2 + nota3) / 3;\n}\n\n// Arrow function\nconst saludar = (nombre) => `¡Hola, ${nombre}!`;\n\nconsole.log(calcularPromedio(4.0, 3.5, 4.5));\nconsole.log(saludar("Ana"));',
              ejercicios: [
                {
                  titulo: "Conversor de temperatura",
                  enunciado:
                    "Crea una arrow function que convierta Celsius a Fahrenheit y otra que haga la conversión inversa.",
                  dificultad: "media",
                },
              ],
            },
            {
              id: "I1L2",
              titulo: "Callbacks y funciones de orden superior",
              duracionMinutos: 90,
              objetivos: [
                "Entender funciones como valores (first-class functions)",
                "Usar callbacks para personalizar comportamiento",
              ],
              temas: [
                "Funciones como valores",
                "Callbacks: funciones que reciben funciones",
                "setTimeout y setInterval",
              ],
              conceptosClave: ["Callback", "Función de orden superior", "First-class function"],
              ejemploCodigo:
                '// Función de orden superior\nconst ejecutarOperacion = (a, b, operacion) => {\n  return operacion(a, b);\n};\n\nconst sumar = (x, y) => x + y;\nconst multiplicar = (x, y) => x * y;\n\nconsole.log(ejecutarOperacion(5, 3, sumar));\nconsole.log(ejecutarOperacion(5, 3, multiplicar));',
              ejercicios: [
                {
                  titulo: "Calculadora con callbacks",
                  enunciado:
                    "Crea una función calculadora que reciba dos números y una función de operación como callback.",
                  dificultad: "media",
                },
              ],
            },
          ],
          evaluacion: {
            tipo: "taller",
            descripcion: "Taller de diseño de funciones y arrow functions",
            criterios: [
              "Las funciones tienen una única responsabilidad clara",
              "Uso correcto de arrow functions",
              "Código limpio y comentado",
            ],
            porcentaje: 15,
          },
        },
        {
          id: "I2",
          titulo: "Arrays y objetos",
          descripcion: "Almacenamiento y manipulación de colecciones de datos.",
          semanasEstimadas: 3,
          lecciones: [
            {
              id: "I2L1",
              titulo: "Arrays y sus métodos",
              duracionMinutos: 100,
              objetivos: [
                "Crear, recorrer y modificar arrays",
                "Aplicar métodos modernos: map, filter, reduce",
              ],
              temas: [
                "Creación e indexación de arrays",
                "Métodos: push, pop, shift, unshift, splice",
                "Métodos funcionales: map, filter, find, reduce",
                "Spread operator (...)",
              ],
              conceptosClave: ["Array", "Método funcional", "Inmutabilidad", "Spread operator"],
              ejemploCodigo:
                'const notas = [4.5, 3.2, 2.8, 5.0, 3.9];\n\nconst aprobados = notas.filter(nota => nota >= 3.0);\nconst notasAltas = notas.map(nota => nota + 0.5);\nconst promedio = notas.reduce((acc, n) => acc + n, 0) / notas.length;\n\nconsole.log("Aprobados:", aprobados);\nconsole.log("Promedio:", promedio.toFixed(2));',
              ejercicios: [
                {
                  titulo: "Gestor de lista de estudiantes",
                  enunciado:
                    "Crea un array de nombres y usa métodos de array para agregar, eliminar y filtrar estudiantes.",
                  dificultad: "media",
                },
              ],
            },
            {
              id: "I2L2",
              titulo: "Objetos y desestructuración",
              duracionMinutos: 100,
              objetivos: [
                "Crear y manipular objetos",
                "Usar desestructuración para acceder a propiedades",
              ],
              temas: [
                "Objetos literales y propiedades",
                "Métodos de objetos",
                "Desestructuración de objetos y arrays",
                "Object.keys(), Object.values(), Object.entries()",
              ],
              conceptosClave: ["Objeto", "Propiedad", "Desestructuración", "JSON"],
              ejemploCodigo:
                'const estudiante = {\n  nombre: "Ana",\n  grado: "10°",\n  notas: [4.5, 3.8, 4.0]\n};\n\nconst { nombre, notas } = estudiante;\nconst promedio = notas.reduce((a, b) => a + b, 0) / notas.length;\n\nconsole.log(`${nombre} tiene un promedio de ${promedio.toFixed(2)}`);',
              ejercicios: [
                {
                  titulo: "Agenda de contactos",
                  enunciado:
                    "Crea un array de objetos contacto (con nombre y teléfono) y una función para buscar contactos por nombre.",
                  dificultad: "media",
                },
              ],
            },
          ],
          evaluacion: {
            tipo: "taller",
            descripcion: "Taller de manipulación de arrays y objetos",
            criterios: [
              "Usa métodos funcionales de arrays (map, filter, reduce)",
              "Aplica desestructuración correctamente",
            ],
            porcentaje: 15,
          },
        },
        {
          id: "I3",
          titulo: "DOM y eventos",
          descripcion: "Interacción con la página web y manejo de eventos del usuario.",
          semanasEstimadas: 2,
          lecciones: [
            {
              id: "I3L1",
              titulo: "Manipulación del DOM",
              duracionMinutos: 90,
              objetivos: [
                "Seleccionar y modificar elementos HTML desde JavaScript",
                "Crear y eliminar elementos dinámicamente",
              ],
              temas: [
                "querySelector y querySelectorAll",
                "textContent, innerHTML, classList",
                "createElement y appendChild",
                "Estilos dinámicos con .style",
              ],
              conceptosClave: ["DOM", "Selector", "Nodo", "Elemento"],
              ejemploCodigo:
                '// Seleccionar un elemento\nconst titulo = document.querySelector("h1");\nconsole.log("Elemento encontrado:", titulo);\n\n// Crear un nuevo elemento\nconst parrafo = document.createElement("p");\nparrafo.textContent = "¡Creado con JavaScript!";\nconsole.log("Nuevo elemento:", parrafo.textContent);',
              ejercicios: [
                {
                  titulo: "Lista dinámica",
                  enunciado:
                    "Escribe código que cree un array de 3 frutas y las imprima en la consola simulando una lista.",
                  dificultad: "media",
                },
              ],
            },
            {
              id: "I3L2",
              titulo: "Eventos del usuario",
              duracionMinutos: 90,
              objetivos: [
                "Responder a acciones del usuario con addEventListener",
                "Manejar eventos de click, input y formularios",
              ],
              temas: [
                "addEventListener y tipos de eventos",
                "Evento click, input, submit",
                "El objeto event y preventDefault",
                "Delegación de eventos",
              ],
              conceptosClave: ["Evento", "Listener", "Delegación", "preventDefault"],
              ejemploCodigo:
                '// Simulación de manejo de eventos\nconst acciones = ["click", "hover", "submit"];\n\nacciones.forEach(accion => {\n  console.log(`Evento registrado: ${accion}`);\n});\n\nconsole.log("¡Todos los eventos están listos!");',
              ejercicios: [
                {
                  titulo: "Contador interactivo",
                  enunciado:
                    "Crea un programa que simule un contador: una variable que se incrementa y decrementa, mostrando el valor actual en consola.",
                  dificultad: "media",
                },
              ],
            },
          ],
          evaluacion: {
            tipo: "quiz",
            descripcion: "Quiz de manipulación del DOM y eventos",
            criterios: [
              "Selecciona elementos del DOM correctamente",
              "Aplica eventos con addEventListener",
            ],
            porcentaje: 10,
          },
        },
        {
          id: "I4",
          titulo: "Proyecto final integrador",
          descripcion:
            "Aplicación de todos los conceptos del curso en un proyecto web funcional.",
          semanasEstimadas: 1,
          lecciones: [
            {
              id: "I4L1",
              titulo: "Diseño y desarrollo del proyecto final",
              duracionMinutos: 180,
              objetivos: [
                "Planificar un proyecto usando funciones, arrays, objetos y eventos",
                "Presentar y sustentar el proyecto ante el grupo",
              ],
              temas: [
                "Ejemplos de proyecto: lista de tareas, quiz interactivo, calculadora avanzada, galería de imágenes",
                "Planificación con pseudocódigo antes de programar",
                "Documentación básica del código",
              ],
              conceptosClave: ["Integración de conceptos", "Pensamiento computacional", "Proyecto web"],
              ejemploCodigo:
                '// Ejemplo: Estructura de un gestor de tareas\nconst tareas = [];\n\nfunction agregarTarea(texto) {\n  tareas.push({ texto, completada: false });\n  console.log(`Tarea agregada: ${texto}`);\n}\n\nfunction mostrarTareas() {\n  tareas.forEach((t, i) => {\n    const estado = t.completada ? "✓" : "○";\n    console.log(`${estado} ${i + 1}. ${t.texto}`);\n  });\n}\n\nagregarTarea("Estudiar JavaScript");\nagregarTarea("Practicar en Mirio");\nagregarTarea("Hacer el proyecto final");\nmostrarTareas();',
              ejercicios: [
                {
                  titulo: "Propuesta de proyecto",
                  enunciado:
                    "Escribe en comentarios tu propuesta: problema a resolver, funcionalidades principales, y qué estructuras de datos usarás.",
                  dificultad: "alta",
                },
              ],
            },
          ],
          evaluacion: {
            tipo: "proyecto",
            descripcion: "Proyecto final del curso",
            criterios: [
              "El proyecto resuelve un problema real o significativo",
              "Integra al menos: funciones, arrays/objetos y lógica de control",
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

export default cursoJavaScriptPrincipiantes;
