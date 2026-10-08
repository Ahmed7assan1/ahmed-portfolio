export interface EducationItem {
  id: string
  institution: string
  degree: string
  field: string
  period: string
  location: string
  grade?: string
  description?: string
  highlights: string[]
}

export interface TrainingProgramItem {
  id: string
  organization: string
  program: string
  track: string
  period: string
  description: string
  points: string[]
  technologies: string[]
}

export const educationData: EducationItem[] = [
  {
    id: 'shorouk-cs',
    institution: 'Shorouk Academy',
    degree: "Bachelor's Degree",
    field: 'Computer Science',
    period: '09/2021 – 07/2025',
    location: 'Cairo, Egypt',
    grade: 'Very Good',
    description:
      'Rigorous foundational computer science curriculum spanning data structures, algorithms, operating systems, software engineering methodologies, database design, and object-oriented architecture.',
    highlights: [
      'Strong academic standing with "Very Good" cumulative grade',
      'Solid theoretical foundation in Advanced Algorithms and Complexity',
      'Developed academic software projects in C#, Java, and SQL databases',
    ],
  },
]

export const professionalProgramsData: TrainingProgramItem[] = [
  {
    id: 'iti-uiux',
    organization: 'Information Technology Institute (ITI)',
    program: 'Professional Training Program (MCIT)',
    track: 'UI/UX Development Track',
    period: '01/2026 – 06/2026',
    description:
      'Selected for an elite, competitive 6-month intensive professional training scholarship sponsored by the Ministry of Communications and Information Technology (MCIT).',
    points: [
      'Focused extensively on UI/UX design thinking, design systems, and user research',
      'Production front-end engineering, software testing methodologies, and debugging',
      'Collaborative project-based learning delivering real-world end-to-end applications',
      'Teamwork, agile workflows, and cross-discipline product delivery skills',
    ],
    technologies: ['Vue.js', 'Nuxt.js', 'Three.js', 'TypeScript', 'Figma', 'UI/UX Design', 'Software Testing'],
  },
  {
    id: 'depi-frontend',
    organization: 'Digital Egypt Pioneers Program (DEPI)',
    program: 'Workforce Development Initiative (MCIT)',
    track: 'Front-End Development Training',
    period: '04/2024 – 10/2024',
    description:
      'Completed an intensive government-backed software development program focusing on enterprise front-end frameworks and component architecture.',
    points: [
      'Comprehensive training in Angular, TypeScript, and modern JavaScript standards',
      'Built multiple real-world web applications adhering to clean architecture',
      'Implemented responsive design, accessibility, and strict Git version control practices',
    ],
    technologies: ['Angular', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Bootstrap', 'Git'],
  },
]
