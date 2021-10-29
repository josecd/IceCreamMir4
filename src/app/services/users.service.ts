import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private router: Router,
    private afs: AngularFirestore
  ) { }

  getUsers() {
    let body = this.afs.collection("users",ref=>ref.orderBy('created_at','desc')) .snapshotChanges()
    .pipe(map(actions => actions.map(this.documentToDomainObject)));
    return body;
  }

  getUserByID(id: any) {
   return this.afs.collection("users").doc(id).valueChanges()
  }

  getUser(body: any) {
    let bodys= this.afs.collection("users", ref => ref.where('name', '==', body.usuario).where('password', '==', body.password).where('approve', '==', true)).snapshotChanges()
    .pipe(map(actions => actions.map(this.documentToDomainObject)));
    return bodys;
  }

  getUserRegister(usuario:any){
    return this.afs.collection("users", ref => ref.where('name', '==', usuario)).valueChanges();
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

  updateUserApprove(body: any, idPeticion: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('usuario') || '{}')
      const id = this.afs.createId();
      this.afs.collection("users").doc(idPeticion).update({
        approve: body,
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }

  documentToDomainObject = (_: any) => {
    const object = _.payload.doc.data();
    object.uid = _.payload.doc.id;
    return object;
  }
}
