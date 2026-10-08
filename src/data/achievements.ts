export interface AchievementItem {
  id: string
  title: string
  subtitle: string
  organization: string
  year: string
  highlightBadge: string
  description: string
  verifiedLink?: string
  metrics?: {
    label: string
    value: string
  }[]
}

export const achievementsData: AchievementItem[] = [
  {
    id: 'ecpc-rank-55',
    title: 'Ranked #55 Nationally — ICPC ECPC Qualifications',
    subtitle: 'Egyptian Collegiate Programming Contest',
    organization: 'International Collegiate Programming Contest (ICPC)',
    year: '2023',
    highlightBadge: 'National Rank #55',
    description:
      'Competed in the Egyptian Collegiate Programming Contest (ECPC), solving algorithmic challenges under strict time and resource constraints and achieving national rank #55 among university teams across Egypt.',
    verifiedLink: 'https://codeforces.com/profile/Abo_7assan',
    metrics: [
      { label: 'National Standing', value: '#55' },
      { label: 'Contest', value: 'ICPC ECPC' },
      { label: 'Domain', value: 'Algorithms & Data Structures' },
    ],
  },
  {
    id: 'codeforces-competitor',
    title: 'Active Competitive Programmer',
    subtitle: 'Algorithmic Problem Solving on Codeforces',
    organization: 'Codeforces',
    year: 'Ongoing',
    highlightBadge: 'Handle: Abo_7assan',
    description:
      'Rigorous practice applying advanced data structures, graph theory, dynamic programming, and complexity optimization to complex computational problems.',
    verifiedLink: 'https://codeforces.com/profile/Abo_7assan',
    metrics: [
      { label: 'Platform', value: 'Codeforces' },
      { label: 'Handle', value: 'Abo_7assan' },
    ],
  },
  {
    id: 'iti-scholarship-selection',
    title: 'Selected for ITI 6-Month Intensive Scholarship',
    subtitle: 'Competitive National Selection',
    organization: 'Information Technology Institute (MCIT)',
    year: '2026',
    highlightBadge: 'Selective Scholarship',
    description:
      'Admitted through competitive technical exams and interviews into the specialized UI/UX Development Track at Egypt’s premier technology institute.',
    metrics: [
      { label: 'Program Duration', value: '6 Months' },
      { label: 'Focus', value: 'UI/UX & Front-End Engineering' },
    ],
  },
]
