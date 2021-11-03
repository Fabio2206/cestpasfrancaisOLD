import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  //Lien dynamique pour envoie vers le serveur
  apiUrl: string = 'localhost:5000/';

  constructor() { }
}
