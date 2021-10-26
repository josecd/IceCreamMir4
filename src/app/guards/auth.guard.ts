import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,

  ) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {

    return new Promise(async (resolve, reject) => {
      if (Object.keys(JSON.parse(localStorage.getItem('usuario') || '{}')).length === 0) {
        this.router.navigate(['/login']);
        return resolve(false);
      }else{
        return resolve(true);

      }
      // if (true) {
      // } else {
       
      // }

    });
  }
}
