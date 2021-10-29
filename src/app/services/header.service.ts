import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  menuGeneral: any;
  menuRoot: any;
  menuAdmin: any;
  menuAnciano: any;
  menuUsuario: any;
  subscription: Subscription;
  constructor(
    private _localstorage: LocalstorageService
  ) {
    this.loadMenu()
    this.subscription = this._localstorage.getHeader().subscribe(message => {
      this.loadMenu()
    });
  }
  loadMenu() {
    let user = JSON.parse(localStorage.getItem('usuario') || '{}')
    if (user.rol == 'usuario') {
      this.menuRoot = [
        {
          id: 1,
          name: 'Home',
          route: '/home'
        },
        // {
        //   id: 3,
        //   name: 'Donaciones',
        //   route: '/donations'
        // },
        {
          id: 4,
          name: 'Mis peticiones',
          route: '/myPetitions'
        },
        {
          id: 7,
          name: 'Mis horas',
          route: '/hoursUser'
        },
      ]
    } else {
      this.menuRoot = [
        {
          id: 1,
          name: 'Home',
          route: '/home'
        },
        {
          id: 2,
          name: 'Usuarios',
          route: '/users'
        },
        {
          id: 3,
          name: 'Donaciones',
          route: '/donations'
        },
        {
          id: 5,
          name: 'Objetos',
          route: '/objects'
        },
        {
          id: 4,
          name: 'Peticiones',
          route: '/petitions'
        },
    
        {
          id: 6,
          name: 'Mis peticiones',
          route: '/myPetitions'
        },
        {
          id: 7,
          name: 'Horas',
          route: '/hours'
        },
        {
          id: 7,
          name: 'Mis horas',
          route: '/hoursUser'
        },
        
      ]
    }





    this.menuGeneral = this.menuRoot;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
