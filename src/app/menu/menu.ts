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
    icon: 'user',
    url: 'profil'
  },
  {
    id: 'gestion-administrateur',
    title: 'Administrateur',
    translate: 'MENU.ADMINISTRATEUR.COLLAPSIBLE',
    type: 'collapsible',
    role: ['Admin'],
    icon: 'eye',
    children: [
       {
        id: 'admin-ajout',
        title: 'Autorisation',
        translate: 'MENU.ADMINISTRATEUR.AUTORISATION',
        type: 'item',
        role: ['Admin'],
        icon: 'circle',
        url: 'administrateur/gestion/autorisation'
       }
    ]
  },
  {
    id: 'fiche',
    title: 'Fiche',
    translate: 'MENU.FICHE',
    type: 'collapsible',
    icon: 'file',
    children: [
      {
        id: 'fiche-ajout',
        title: 'Ajouter',
        translate: 'MENU.FICHE.AJOUTER',
        type: 'item',
        role: ['Admin', 'Professeur'],
        icon: 'circle',
        url: 'fiche/ajouter'
      },
      {
        id: 'fiche-lister',
        title: 'Lister',
        translate: 'MENU.FICHE.LISTER',
        type: 'item',
        icon: 'circle',
        url: 'fiche/lister'
      }
    ]
  }
]
