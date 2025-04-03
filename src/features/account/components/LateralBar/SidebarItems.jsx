import { accountUrls } from '../../../../routes/urls/accountUrls'

export const sectionItems = [
  {
    key: 'accountSettings',
    title: 'Settings',
    items: [
      {
        key: 'profile',
        to: accountUrls.profile,
        icon: 'solar:user-outline',
        title: 'Profile'
      },
      {
        key: 'security',
        to: accountUrls.security,
        icon: 'solar:shield-check-linear',
        title: 'Security'
      }
    ]
  }
]
