import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PetitionsService {
  adminDocRef!: AngularFirestoreDocument;

  private shirtCollection!: AngularFirestoreCollection<any>;
  shirts!: Observable<any>;
  constructor(
    private afs: AngularFirestore
  ) { }

  getPetitionsList() {
    return this.afs.collection("petitions", ref => ref.where('status', '==', true)).valueChanges()
  }

  getPetitionsListTest() {
    let cast = this.afs.collection("petitions", ref => ref.where('status', '==', true)).snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)));
    return cast;
  }

  documentToDomainObject = (_: any) => {
    const object = _.payload.doc.data();
    object.uid = _.payload.doc.id;
    return object;
  }

  getPetitions() {
    return this.afs.collection("objects", ref => ref.where('status', '==', true)).valueChanges();
  }

  getPetitionsAlerts() {
    return this.afs.collection("globals", ref => ref.where('status', '==', true).where('type', '==', 'alertPetition ')).valueChanges();
  }

  registerPetition(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('usuario') || '{}')
      const id = this.afs.createId();
      this.afs.collection("petitions").add({
        id: id,
        approve: false,
        count: body.count,
        created_at: new Date(),
        dateAttended: '',
        description: body.description,
        descriptionRefues: '',
        idUser: user.id,
        isDeleted: false,
        nameAttended: '',
        nameObject: body.object,
        nameView: '',
        status: true,
        statusView: false,
        userName: user.name,
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }


  updatePetitionView(idPeticion: any): Promise<any> {
    console.log(idPeticion);

    return new Promise(async (resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('usuario') || '{}')
      this.adminDocRef = this.afs.collection('petitions').doc(idPeticion);
      this.adminDocRef.update({
        nameView: user.name,
        statusView: true,
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })


    })
  }


  updatePetitionClose(body: any, idPeticion: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('usuario') || '{}')
      const id = this.afs.createId();
      this.afs.collection("petitions").doc(idPeticion).update({
        approve: body.approve,
        dateAttended: new Date(),
        descriptionRefues: body.description,
        nameAttended: user.name,
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
