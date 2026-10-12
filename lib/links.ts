export const GITHUB_USERNAME = 'takiatah'

const repo = (name: string) => `https://github.com/${GITHUB_USERNAME}/${name}`

export const profileLinks = {
  github: `https://github.com/${GITHUB_USERNAME}`,
  linkedin: 'https://www.linkedin.com/in/takia-tahmid-195900349/',
} as const

export const repoLinks = {
  onlineRetail: repo('online-retail-data-sales-analysis'),
<<<<<<< HEAD
  bellabeat: repo('bellabeat-fitness-data-analysis'),
=======
>>>>>>> d0bfc794eb4f5fe4767b09c0f61e5b71fa0ee8aa
  snakeGame: repo('snake-game'),
  oliveAndVine: repo('olive-and-vine-website'),
  titanic: repo('Titanic-Predictions---Machine-Learning-Kaggle-Competition'),
  mangataAndGallo: repo('mangata-and-gallo-website'),
} as const

export const externalLinks = {
  titanicKaggleNotebook: 'https://www.kaggle.com/code/takia2006/titanic-machine-learning-predictions',
<<<<<<< HEAD
  bellabeatKaggleNotebook: 'https://www.kaggle.com/code/takia2006/bellabeat-case-study-using-python-and-sql',
  bellabeatTableau:
    'https://public.tableau.com/views/FitbitActivityAnalysisDashboards/ActivitybyHourandDayoftheWeekDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
  fitbitDataset: 'https://www.kaggle.com/datasets/arashnic/fitbit',
=======
>>>>>>> d0bfc794eb4f5fe4767b09c0f61e5b71fa0ee8aa
  gprDataset: 'https://www.matteoiacoviello.com/gpr.htm',
} as const
