import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private router: Router,
    private afs: AngularFirestore
  ) { }

  getUsers() {
    return this.afs.collection("users").valueChanges();
  }

  getUser(body: any) {
    return this.afs.collection("users", ref => ref.where('name', '==', body.usuario).where('password', '==', body.password)).valueChanges();
  }


  getNotification() {
    return this.afs.collection("users").doc("eO1l8Ec0ZEQTp1UTZPDU").collection('notifications', ref => ref.where('isDeleted', '==', false)).valueChanges();
  }

  getCurrentUser() {
    return new Promise(async (resolve, reject) => {
      if (Object.keys(JSON.parse(localStorage.getItem('usuario') || '{}')).length === 0) {
        this.router.navigate(['/login']);
        return resolve(false);
      } else {
        return resolve(true);
      }
    });
  }

  registerUser(body:any): Promise<any>{
    return new Promise(async (resolve, reject) => {
      const id = this.afs.createId();
      this.afs.collection("users").add({
        id:id,
        approve: false,
        created_at: new Date(),
        discord:body.discord,
        isDeleted: false,
        name:body.name,
        password:body.password,
        rol:'usuario',
      }).then(res=>{ 
        resolve(res)
      }).catch(error=>{
        reject(error)
      })
    })
  }
}
