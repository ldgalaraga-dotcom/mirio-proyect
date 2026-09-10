export interface LearningPath {
  id: string
  title: string
  description: string
  logo: string
  progress: number
}

export const initialLearningPaths: LearningPath[] = [
  {
    id: 'python',
    title: 'Python',
    description: 'Aprende programación desde cero con Mirio 2.',
    logo: '/images/python/python-snakes-icon.png',
    progress: 0,
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Lógica y desarrollo web interactivo.',
    logo: '/images/javascrip-logo.png',
    progress: 0,
  },
  {
    id: 'html',
    title: 'HTML',
    description: 'Estructura tus páginas web.',
    logo: '/images/html-logo.png',
    progress: 0,
  },
  {
    id: 'css',
    title: 'CSS',
    description: 'Diseña y da estilo a tus sitios.',
    logo: '/images/css-logo.png',
    progress: 0,
  },
  {
    id: 'sql',
    title: 'Bases de datos',
    description: 'Conceptos básicos y consultas simples.',
    logo: '/images/sql-logo.png',
    progress: 0,
  },
]
