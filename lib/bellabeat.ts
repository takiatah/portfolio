import { dataLabProjects } from '@/lib/projects'
import { externalLinks, repoLinks } from '@/lib/links'

export const bellabeatProject = dataLabProjects.find((p) => p.slug === 'bellabeat')!

export const bellabeatLinks = {
  repo: repoLinks.bellabeat,
  notebook: externalLinks.bellabeatKaggleNotebook,
  tableau: externalLinks.bellabeatTableau,
  dataset: externalLinks.fitbitDataset,
} as const

export const bellabeatDashboards = [
  {
    id: 'user-classification',
    title: 'User classification by activity',
    src: '/media/bellabeat/user-classification-dashboard.png',
    alt: 'Tableau dashboard with two pie charts: whether users meet recommended exercise minutes, and activity level based on average daily steps.',
    caption:
      'Tableau: User Classification by Activity Dashboard. Counts are from 35 Fitbit users in the cleaned daily activity table.',
  },
  {
    id: 'hourly-weekly',
    title: 'Activity by hour and day of the week',
    src: '/media/bellabeat/activity-by-hour-and-day-of-the-week-dashboard.png',
    alt: 'Tableau dashboard of average hourly steps and intensity on weekdays versus weekends, plus average steps and intensity by day of the week.',
    caption:
      'Tableau: Activity by Hour and Day of the Week Dashboard. Hourly series compare weekday, weekend, and overall averages.',
  },
  {
    id: 'sleep',
    title: 'Sleep dashboard',
    src: '/media/bellabeat/sleep-dashboard.png',
    alt: 'Tableau dashboard relating hours of sedentary activity to hours of sleep, plus average hours of sleep by day of the week.',
    caption:
      'Tableau: Sleep Dashboard. Sleep averages use days with a matching sleep record. The recommended 7–9 hour band is shown on the chart.',
  },
] as const

/** Classification counts read from the published Tableau user-classification dashboard. */
export const stepActivityLevels = [
  { label: 'Sedentary (< 5,000 steps)', users: 11, share: '31.43%' },
  { label: 'Low Active (5,000–7,499)', users: 9, share: '25.71%' },
  { label: 'Somewhat Active (7,500–9,999)', users: 8, share: '22.86%' },
  { label: 'Active (10,000–12,499)', users: 5, share: '14.29%' },
  { label: 'Highly Active (> 12,500)', users: 2, share: '5.71%' },
] as const

export const exerciseRecommendation = [
  { label: 'Enough Exercise', users: 23, share: '65.71%' },
  { label: 'Not Enough Exercise', users: 12, share: '34.29%' },
] as const

/** Day-of-week averages read from the published Tableau dashboards. */
export const weeklyAverages = [
  { day: 'Sunday', steps: 6606.73, intensity: 10.74, sleepHours: 7.55 },
  { day: 'Monday', steps: 7541.32, intensity: 11.76, sleepHours: 6.99 },
  { day: 'Tuesday', steps: 7718.96, intensity: 12.18, sleepHours: 6.74 },
  { day: 'Wednesday', steps: 7547.58, intensity: 11.82, sleepHours: 7.24 },
  { day: 'Thursday', steps: 7268.3, intensity: 11.51, sleepHours: 6.69 },
  { day: 'Friday', steps: 7187.53, intensity: 11.64, sleepHours: 6.76 },
  { day: 'Saturday', steps: 7752.27, intensity: 12.33, sleepHours: 6.98 },
] as const

export const verifiedFindings = [
  'Most users are not getting the recommended 8,000–10,000 steps and fall within the sedentary to somewhat active categories (28 of 35 users, from the step-classification dashboard).',
  'Saturday had the highest average activity levels, with 7,752 steps and an average intensity score of 12.33.',
  'Sunday is the day with least activity (6,607 steps and 10.74 intensity) but the most sleep (7.55 hours), indicating that it is a rest day.',
  'Users who had more sedentary minutes tended to sleep less, suggesting a potential negative relationship between sleep duration and sedentary behavior.',
  'On weekdays, activity is affected by work schedule and most activity is from 5 PM to 7 PM.',
  'On weekends, activity is more consistent throughout the day and higher from 12 PM to 2 PM.',
]

export const recommendations = [
  'The Bellabeat marketing team should focus marketing primarily on everyday women instead of more active athletes, since that is the majority of smart fitness device users. Marketing should emphasize a woman’s well-being and being healthy over being active, and everyday activities like cleaning and going to work should be acknowledged to encourage women.',
  'The Bellabeat app should send motivating messages throughout the day and recommend workouts on Saturday noons and Tuesday evenings, since people are most active around these times. The Bellabeat app should send calming messages on Sunday and recommend relaxing activities like yoga to reduce stress from the week because Sunday seems to be a rest day.',
  'The Bellabeat app should give incentives for getting 8 hours of sleep and getting 8,000 steps a day. Incentives can be a streak count or points that can be used to unlock features in the app, customize the app, or can be applied to a discount for future Bellabeat purchases. The app should also encourage users to take a short walk after long periods of sedentary activity to improve sleep and help them meet the recommended daily step goals.',
]

export const limitations = [
  'The dataset contains data from a relatively small sample of Fitbit users.',
  'Data was collected between March and May 2016, so it is outdated.',
  'Sleep data was not available for all participants or throughout the whole time period.',
  'The dataset represents Fitbit users and may not fully reflect Bellabeat’s target customer base.',
]
