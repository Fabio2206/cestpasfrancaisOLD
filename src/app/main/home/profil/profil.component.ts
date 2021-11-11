import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
// public
  public contentHeader: object;

  constructor() {

  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Profil',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Accueil',
            isLink: true,
            link: '/accueil'
          },
          {
            name: 'Profil',
            isLink: false
          }
        ]
      }
    };
  }
}
