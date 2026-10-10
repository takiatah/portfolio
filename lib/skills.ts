export type SkillExperience = 'applied' | 'coursework' | 'learning'

export const experienceLabels: Record<SkillExperience, string> = {
  applied: 'Applied in projects',
  coursework: 'Coursework',
  learning: 'Currently learning',
}

export interface Skill {
  name: string
  experience: SkillExperience
  /** Where the skill has been used. */
  usedIn?: string
}

export interface SkillCategory {
  id: string
  name: string
  description: string
  accentVar: string
  /** Position of the constellation on the skill map, as percentages. */
  map: { x: number; y: number }
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    name: 'Programming Languages',
    description: 'The languages I write in, from systems work in C to data work in Python.',
    accentVar: '--accent-engineering',
    map: { x: 20, y: 22 },
    skills: [
      { name: 'Python', experience: 'applied', usedIn: 'Titanic Predictions, Online Retail II' },
      { name: 'Java', experience: 'applied', usedIn: 'Snake Game, Network Routing, Pathfinding Game' },
      { name: 'C', experience: 'coursework', usedIn: 'C Memory Allocator' },
      { name: 'OCaml', experience: 'coursework', usedIn: 'Interactive Fiction Engine' },
      { name: 'SQL', experience: 'coursework', usedIn: 'Querying relational data' },
      { name: 'JavaScript', experience: 'applied', usedIn: 'Web projects' },
    ],
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    description: 'Turning raw tables into clean datasets, summaries, and visual stories.',
    accentVar: '--accent-data',
    map: { x: 80, y: 22 },
    skills: [
      { name: 'Pandas', experience: 'applied', usedIn: 'Titanic Predictions, Online Retail II' },
      { name: 'Data cleaning', experience: 'applied', usedIn: 'Online Retail II' },
      { name: 'Exploratory data analysis', experience: 'applied', usedIn: 'Online Retail II, Titanic' },
      { name: 'Data visualization', experience: 'applied', usedIn: 'China–Russia dashboard' },
      { name: 'Statistical analysis', experience: 'coursework' },
      { name: 'Tableau', experience: 'coursework' },
      { name: 'Excel', experience: 'applied' },
      { name: 'Google Sheets', experience: 'applied' },
      { name: 'SQL', experience: 'coursework' },
      { name: 'SQLite', experience: 'coursework' },
      { name: 'PostgreSQL', experience: 'learning' },
    ],
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    description: 'Supervised learning fundamentals, with hands-on practice through Kaggle.',
    accentVar: '--accent-ml',
    map: { x: 14, y: 72 },
    skills: [
      { name: 'Supervised learning', experience: 'applied', usedIn: 'Titanic Predictions' },
      { name: 'Random Forest & XGBoost', experience: 'applied', usedIn: 'Titanic Predictions' },
      { name: 'Model evaluation', experience: 'applied', usedIn: 'Titanic validation accuracy' },
      { name: 'Kaggle competitions', experience: 'applied', usedIn: 'Titanic Predictions' },
      { name: 'Regression', experience: 'coursework' },
      { name: 'Regularization', experience: 'coursework' },
      { name: 'Recommender systems', experience: 'coursework' },
      { name: 'Feature engineering', experience: 'learning', usedIn: 'One-hot encoding in Titanic' },
      { name: 'Neural networks', experience: 'learning' },
    ],
  },
  {
    id: 'web',
    name: 'Web Applications',
    description: 'Responsive, accessible front ends, from hand-written CSS to React.',
    accentVar: '--accent-design',
    map: { x: 86, y: 72 },
    skills: [
      { name: 'HTML', experience: 'applied', usedIn: 'Olive & Vine, Mangata & Gallo' },
      { name: 'CSS', experience: 'applied', usedIn: 'Mangata & Gallo, Olive & Vine' },
      { name: 'JavaScript', experience: 'applied' },
      { name: 'Bootstrap', experience: 'applied', usedIn: 'Olive & Vine' },
      { name: 'Responsive web design', experience: 'applied', usedIn: 'All website projects' },
      { name: 'UI implementation', experience: 'applied' },
      { name: 'Front-end development', experience: 'applied' },
      { name: 'React & Next.js', experience: 'applied', usedIn: 'This portfolio' },
      { name: 'Django', experience: 'coursework' },
    ],
  },
  {
    id: 'tools',
    name: 'Tools & Other Technologies',
    description: 'The everyday tooling behind the projects.',
    accentVar: '--accent-research',
    map: { x: 50, y: 88 },
    skills: [
      { name: 'Git & GitHub', experience: 'applied', usedIn: 'All public repositories' },
      { name: 'Jupyter Notebook', experience: 'applied', usedIn: 'Titanic Predictions' },
      { name: 'Figma', experience: 'applied', usedIn: 'Synergy concept' },
      { name: 'Maven', experience: 'coursework', usedIn: 'Java coursework' },
      { name: 'OUnit', experience: 'coursework', usedIn: 'OCaml Interactive Fiction Engine' },
      { name: 'Recharts', experience: 'applied', usedIn: 'This portfolio' },
      { name: 'Linux & command line', experience: 'coursework' },
    ],
  },
]

export const skillsSummary = ['Python', 'Java', 'Pandas', 'SQL', 'scikit-learn', 'HTML & CSS', 'Git']
