export interface SkillItem {
  name: string
  highlight?: boolean
  description?: string
}

export interface SkillCategory {
  id: string
  title: string
  description: string
  skills: SkillItem[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Front-End Engineering',
    description: 'Component architecture, responsive systems, and state-driven interactive user interfaces.',
    skills: [
      { name: 'React.js', highlight: true, description: 'Single Page Apps, Hooks, Performance, Custom UI' },
      { name: 'TypeScript', highlight: true, description: 'Type-safe architecture, Generics, Strict mode' },
      { name: 'Angular', highlight: true, description: 'Component-based architecture, Services, RxJS' },
      { name: 'Vue.js / Nuxt.js', highlight: true, description: 'Composition API, SSR/PWA, TresJS 3D' },
      { name: 'JavaScript (ES6+)', highlight: true, description: 'Modern asynchronous patterns, DOM optimization' },
      { name: 'Tailwind CSS', highlight: true, description: 'Design tokens, utilities, responsive layouts' },
      { name: 'Redux Toolkit', highlight: false, description: 'Centralized state management & async thunks' },
      { name: 'Pinia', highlight: false, description: 'Vue modern reactive store' },
      { name: 'HTML5 & Semantic Web', highlight: false, description: 'Accessible markup, SEO, clean structure' },
      { name: 'CSS3 / Sass', highlight: false, description: 'Custom properties, responsive flex/grid, micro-animations' },
      { name: 'Responsive Design', highlight: false, description: 'Mobile-first, touch targets, cross-browser support' },
    ],
  },
  {
    id: 'ai-automation',
    title: 'AI Integration & Automation',
    description: 'LLM orchestration, agentic pipelines, RAG systems, and workflow automation.',
    skills: [
      { name: 'Flowise', highlight: true, description: 'Low-code LLM orchestration, custom nodes & agents' },
      { name: 'n8n', highlight: true, description: 'Workflow automation pipelines, webhook triggers, API sync' },
      { name: 'LLM Integration', highlight: true, description: 'Embedding models, prompt chaining, streaming responses' },
      { name: 'Prompt Engineering', highlight: true, description: 'Few-shot prompting, evaluation, edge-case mitigation' },
      { name: 'AI Workflow Automation', highlight: false, description: 'Automated document processing, notifications & data flow' },
    ],
  },
  {
    id: 'backend-apis',
    title: 'APIs, Backend & Data',
    description: 'Data persistence, real-time protocols, RESTful services, and relational databases.',
    skills: [
      { name: 'RESTful APIs', highlight: true, description: 'Contract design, consumption, error recovery' },
      { name: 'WebRTC', highlight: true, description: 'Peer-to-peer audio/video streaming & data channels' },
      { name: 'Supabase', highlight: true, description: 'PostgreSQL database, Auth, Storage, Row Level Security' },
      { name: 'SQL Server', highlight: false, description: 'Relational queries, schema design, stored procedures' },
      { name: 'MySQL', highlight: false, description: 'Database modeling, transactions, normalization' },
      { name: 'Python', highlight: false, description: 'Scripting, AI tooling, data handling' },
      { name: 'C# / Java / C++', highlight: false, description: 'Object-oriented programming, data structures' },
    ],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX & Product Design',
    description: 'User-centered design methodologies, interactive prototyping, and visual design assets.',
    skills: [
      { name: 'Figma', highlight: true, description: 'Design systems, wireframing, high-fidelity prototypes' },
      { name: 'Design Thinking', highlight: true, description: 'User-centric empathy, problem framing, iterative testing' },
      { name: 'Adobe Photoshop', highlight: false, description: 'Visual asset creation, graphics editing' },
      { name: 'Adobe Illustrator', highlight: false, description: 'Vector graphics, branding, iconography' },
    ],
  },
  {
    id: 'testing-quality',
    title: 'Testing & Engineering Quality',
    description: 'Verifiable, testable code, thorough debugging, and systematic issue isolation.',
    skills: [
      { name: 'Software Testing', highlight: true, description: 'Test methodologies, regression verification' },
      { name: 'Unit Testing', highlight: false, description: 'Component isolation, behavior verification' },
      { name: 'Test Cases & Plans', highlight: false, description: 'Scenario mapping, edge-case coverage' },
      { name: 'Debugging & Diagnostics', highlight: true, description: 'Browser DevTools, performance profiling, root-cause analysis' },
      { name: 'Troubleshooting', highlight: false, description: 'Systematic triage and issue resolution' },
    ],
  },
  {
    id: 'tools-algorithms',
    title: 'Tools & Problem Solving',
    description: 'Algorithmic reasoning, version control, and modern build tooling.',
    skills: [
      { name: 'Git & GitHub', highlight: true, description: 'Branching, PRs, semantic commit history' },
      { name: 'Vite & Modern Bundlers', highlight: true, description: 'Hot module replacement, production code splitting' },
      { name: 'Data Structures & Algorithms', highlight: true, description: 'Graphs, DP, trees, complexity analysis (ECPC #55)' },
      { name: 'Three.js / TresJS', highlight: false, description: '3D scene rendering, lighting, camera controls' },
      { name: 'Perceptual Hashing & Sharp', highlight: false, description: 'Visual image similarity algorithms & high-speed image processing' },
    ],
  },
]
