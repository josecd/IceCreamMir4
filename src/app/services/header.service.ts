import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  menuGeneral:any;
  menuRoot: any;
  menuAdmin: any;
  menuAnciano: any;
  menuUsuario: any;
  constructor() { 
    this.loadMenu()
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
        {
          id: 3,
          name: 'Donaciones',
          route: '/donations'
        },
        {
          id: 4,
          name: 'Peticiones',
          route: '/petitions'
        },
      ]
    }else{
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
          id: 4,
          name: 'Peticiones',
          route: '/petitions'
        },
        {
          id: 5,
          name: 'Objetos',
          route: '/objects'
        },
      ]
    }





    this.menuGeneral = this.menuRoot;
  }

}
