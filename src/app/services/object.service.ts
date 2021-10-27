import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getObjectsListTest() {
    let cast = this.afs.collection("objects", ref => ref.where('isDeleted', '==', false)).snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)));
    return cast;
  }

  documentToDomainObject = (_: any) => {
    const object = _.payload.doc.data();
    object.uid = _.payload.doc.id;
    return object;
  }


  registerObjects(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('usuario') || '{}')
      const id = this.afs.createId();
      this.afs.collection("objects").add({
        created_at: new Date(),
        idUser: user.id,
        isDeleted: false,
        status: true,
        name:body,
        userName: user.name,

      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }

  
  updateObjectStatus(body: any, idPeticion: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('usuario') || '{}')
      const id = this.afs.createId();
      this.afs.collection("objects").doc(idPeticion).update({
        status: body,

      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }

}
