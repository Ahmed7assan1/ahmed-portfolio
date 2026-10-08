export interface SocialLink {
  platform: string
  url: string
  icon: string
  label: string
}

export interface PersonalInfo {
  fullName: string
  displayName: string
  jobTitle: string
  headline: string
  specialization: string[]
  bio: string
  summary: string
  email: string
  phone: string
  location: string
  cvUrl: string
  avatarUrl?: string
  socialLinks: SocialLink[]
  stats: {
    label: string
    value: string
    detail: string
  }[]
}

export const personalData: PersonalInfo = {
  fullName: 'Ahmed Hassan Mohamed Hassan El-Naggar',
  displayName: 'Ahmed Hassan',
  jobTitle: 'Software Engineer | Front-End Developer',
  headline: 'Software Engineer & Front-End Developer building high-performance, accessible web applications and AI-integrated workflows.',
  specialization: ['React', 'TypeScript', 'Angular', 'AI Integration & Automation', 'UI/UX Design'],
  bio: 'Results-driven Software Engineer and Computer Science graduate with a strong foundation in Algorithms and Competitive Programming (ECPC National Rank #55). Specialized in building responsive and user-centric web applications using React.js, TypeScript, JavaScript, and Vue.js. Experienced in UI/UX design, state management, REST APIs, AI-powered solutions, and workflow automation. Focused on clean, maintainable code, debugging, software testing, and high-performance interfaces.',
  summary: 'Computer Science graduate with deep foundations in algorithms, front-end architecture, and AI-assisted workflows. Crafting verified, accessible, and performant web systems.',
  email: 'ahmedhassan1907ua@gmail.com',
  phone: '+201016191608',
  location: 'Cairo, Egypt',
  cvUrl: `${import.meta.env.BASE_URL}Ahmed_Hassan_CV.pdf`,
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/Ahmed7assan1',
      icon: 'github',
      label: 'github.com/Ahmed7assan1',
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/Ahmed_Hassan',
      icon: 'linkedin',
      label: 'linkedin.com/Ahmed_Hassan',
    },
    {
      platform: 'Codeforces',
      url: 'https://codeforces.com/profile/Abo_7assan',
      icon: 'codeforces',
      label: 'codeforces.com/Abo_7assan',
    },
    {
      platform: 'Behance',
      url: 'https://behance.net/ahmedhassan498',
      icon: 'behance',
      label: 'behance.net/ahmedhassan498',
    },
  ],
  stats: [
    {
      label: 'Competitive Programming',
      value: '#55',
      detail: 'ECPC National Rank (Egyptian Collegiate Contest)',
    },
    {
      label: 'Featured Platforms',
      value: '3+',
      detail: 'Production & Full-Scale Client/AI Applications',
    },
    {
      label: 'Professional Training',
      value: '12mo',
      detail: 'Intensive Programs at ITI & DEPI (MCIT)',
    },
    {
      label: 'Academic Foundation',
      value: 'Very Good',
      detail: "B.Sc. in Computer Science (Shorouk Academy)",
    },
  ],
}
