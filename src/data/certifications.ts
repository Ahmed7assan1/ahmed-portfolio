export interface CertificationItem {
  id: string
  title: string
  issuer: string
  period?: string
  credentialType: 'Professional Program' | 'Technical Workshop' | 'Cloud & Systems' | 'Software Engineering' | 'Design'
  description: string
  certificateUrl?: string
  skillsCovered: string[]
}

export const certificationsData: CertificationItem[] = [
  {
    id: 'iti-uiux-cert',
    title: 'UI/UX Development Track Certification',
    issuer: 'Information Technology Institute (ITI) / MCIT Egypt',
    period: '01/2026 – 06/2026',
    credentialType: 'Professional Program',
    description:
      'Completed intensive 6-month training in UI/UX design, modern front-end engineering, software testing, and full product development lifecycle.',
    certificateUrl: `${import.meta.env.BASE_URL}ITI_Certificate.pdf`,
    skillsCovered: ['UI/UX Design', 'Vue.js', 'Nuxt.js', 'Three.js', 'Testing & QA', 'Design Systems'],
  },
  {
    id: 'depi-sw-cert',
    title: 'Digital Egypt Pioneers Program — Software Development',
    issuer: 'Ministry of Communications & Information Technology (MCIT), Egypt',
    period: '04/2024 – 10/2024',
    credentialType: 'Professional Program',
    description:
      'Completed intensive training in Angular, TypeScript, and modern component-based front-end engineering with responsive architecture.',
    skillsCovered: ['Angular', 'TypeScript', 'Responsive Design', 'Component Architecture'],
  },
  {
    id: 'genai-hackathon-cert',
    title: 'Gen AI for Education Hackathon — Technical Enablement Week',
    issuer: 'MCIT Egypt | Egypt University of Informatics (Innovation Center)',
    period: 'August 2026',
    credentialType: 'Technical Workshop',
    description:
      'Completed attendance and technical requirements for the Enablement Week workshop series focused on Generative AI architectures and educational tools.',
    certificateUrl: `${import.meta.env.BASE_URL}Ahmed_Hassan_GenAI.pdf`,
    skillsCovered: ['Generative AI', 'Prompt Engineering', 'LLMs in Education'],
  },
  {
    id: 'ibm-cloud-cert',
    title: 'Cloud Computing Essentials',
    issuer: 'IBM SkillsBuild',
    period: '2026',
    credentialType: 'Cloud & Systems',
    description:
      'Mastered cloud service architectures (IaaS, PaaS, SaaS), modern deployment models, cloud APIs, and diagnostic troubleshooting techniques.',
    skillsCovered: ['Cloud Computing', 'IaaS / PaaS / SaaS', 'Cloud APIs', 'Troubleshooting'],
  },
  {
    id: 'depi-english-cert',
    title: 'Business & Technical English Program',
    issuer: 'MCIT Egypt | Berlitz',
    period: '2024',
    credentialType: 'Professional Program',
    description:
      'Trained in technical English communication, structured engineering presentations, and international cross-functional collaboration.',
    skillsCovered: ['Technical Communication', 'Engineering Presentations', 'Professional English'],
  },
  {
    id: 'hp-design-thinking',
    title: 'Design Thinking',
    issuer: 'HP LIFE',
    period: '2024',
    credentialType: 'Design',
    description:
      'Practical training in human-centered problem solving, user empathy mapping, rapid prototyping, and iterative solution validation.',
    skillsCovered: ['Design Thinking', 'User Empathy', 'Creative Problem Solving'],
  },
  {
    id: 'ssdlc-cert',
    title: 'Secure Software Development Lifecycle (SSDLC)',
    issuer: 'Professional Training',
    period: '2024',
    credentialType: 'Software Engineering',
    description:
      'Fundamental principles of secure coding practices, threat identification, and integrating security throughout the software engineering lifecycle.',
    skillsCovered: ['SSDLC', 'Secure Coding Practices', 'Threat Awareness'],
  },
  {
    id: 'typescript-fundamentals',
    title: 'TypeScript Fundamentals',
    issuer: 'Professional Training',
    period: '2024',
    credentialType: 'Software Engineering',
    description:
      'TypeScript typing system, interfaces, generics, classes, strict compiler configuration, and migration into JavaScript codebases.',
    skillsCovered: ['TypeScript', 'Type Annotations', 'Interfaces & Generics'],
  },
]
