export interface ExperienceItem {
  id: string
  company: string
  role: string
  location?: string
  workType?: string
  period: string
  isCurrent?: boolean
  description: string
  responsibilities: string[]
  technologies: string[]
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'freelance-frontend',
    company: 'Independent / Freelance',
    role: 'Freelance Front-End Developer',
    location: 'Remote',
    workType: 'Freelance',
    period: 'Ongoing',
    isCurrent: true,
    description:
      'Designing and developing client-focused, responsive web pages and interfaces with a strong focus on accessibility, clean code, and user experience.',
    responsibilities: [
      'Developed responsive web pages and modern user interfaces aligned precisely with client technical requirements.',
      'Collaborated closely with clients to discover needs and translate specifications into functional, user-friendly solutions.',
      'Exercised independent task management, adaptive problem solving, and disciplined delivery schedules.',
      'Maintained clear technical documentation and rigorous quality standards across all delivered codebases.',
    ],
    technologies: ['React.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'REST APIs', 'Git'],
  },
  {
    id: 'outlier-ai',
    company: 'Outlier',
    role: 'Remote AI Operations & Prompt Engineering',
    location: 'Remote',
    workType: 'Remote Contractor',
    period: 'Contract',
    isCurrent: false,
    description:
      'Evaluated and improved frontier AI model responses through structured prompt engineering, rigorous output auditing, and reasoning analysis.',
    responsibilities: [
      'Improved AI model responses through structured prompt engineering and systematic evaluation frameworks.',
      'Analyzed model outputs in depth to identify nuanced reasoning flaws, hallucinations, and edge cases.',
      'Enhanced response accuracy, consistency, and adherence to complex multi-step instructions.',
      'Contributed directly to benchmarking and improving model usability and overall output quality.',
    ],
    technologies: ['Prompt Engineering', 'LLM Evaluation', 'Reasoning Analysis', 'Edge-Case Auditing'],
  },
  {
    id: 'first-markets',
    company: 'First Markets',
    role: 'Graphic Designer & UI/Visual Design Support',
    location: 'Cairo, Egypt',
    workType: 'Design Support',
    period: 'Contract / Support',
    isCurrent: false,
    description:
      'Created visual assets and supported UI design efforts applying human-centered design principles for commercial digital products.',
    responsibilities: [
      'Designed visual assets, vector graphics, and UI elements based on client brand specifications and business goals.',
      'Applied UI/UX principles to ensure consistent, intuitive, and user-friendly digital experiences.',
      'Collaborated cross-functionally with engineering and marketing teams to deliver cohesive digital solutions.',
    ],
    technologies: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'UI/UX Principles', 'Design Systems'],
  },
]
