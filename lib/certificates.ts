export type CertificateStatus = 'completed' | 'in-progress'

export interface Certificate {
  title: string
  issuer: string
  status: CertificateStatus
  /** Completion date for completed certificates, e.g. "May 2026". */
  completed?: string
  credentialUrl?: string
  topics?: string
}

export const certificates: Certificate[] = [
  {
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google',
    status: 'completed',
    completed: 'May 2026',
    topics: 'Data cleaning, SQL, analysis, visualization, Excel, Python/Pandas, Tableau, Git',
  },
  {
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI',
    status: 'completed',
    completed: 'Aug 2026',
    topics: 'Neural networks, reinforcement learning, clustering, model evaluation, scikit-learn, TensorFlow',
  },
  {
    title: 'Meta Full Stack Developer: Front-End & Back-End from Scratch',
    issuer: 'Meta',
    status: 'in-progress',
    topics: 'REST APIs, authentication, responsive design, React, Django, SQL, Git',
  },
]
