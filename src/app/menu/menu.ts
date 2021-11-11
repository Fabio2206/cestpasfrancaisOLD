import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'accueil',
    title: 'Tableau de bord',
    translate: 'MENU.ACCUEIL',
    type: 'item',
    icon: 'home',
    url: 'accueil'
  },
  {
    id: 'profil',
    title: 'Profil',
    translate: 'MENU.PROFIL',
    type: 'item',
    icon: 'file',
    url: 'profil'
  }
]
