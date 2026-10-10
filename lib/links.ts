export const GITHUB_USERNAME = 'takiatah'

const repo = (name: string) => `https://github.com/${GITHUB_USERNAME}/${name}`

export const profileLinks = {
  github: `https://github.com/${GITHUB_USERNAME}`,
  linkedin: 'https://www.linkedin.com/in/takia-tahmid-195900349/',
} as const

export const repoLinks = {
  onlineRetail: repo('online-retail-data-sales-analysis'),
  snakeGame: repo('snake-game'),
  oliveAndVine: repo('olive-and-vine-website'),
  titanic: repo('Titanic-Predictions---Machine-Learning-Kaggle-Competition'),
  mangataAndGallo: repo('mangata-and-gallo-website'),
} as const

export const externalLinks = {
  titanicKaggleNotebook: 'https://www.kaggle.com/code/takia2006/titanic-machine-learning-predictions',
  gprDataset: 'https://www.matteoiacoviello.com/gpr.htm',
} as const
