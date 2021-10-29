import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActiveHoursService {
  adminDocRef!: AngularFirestoreDocument;
  subscription: Subscription;
  user: any
  constructor(
    private afs: AngularFirestore,
    private _localstorage: LocalstorageService
  ) {
    this.user = JSON.parse(localStorage.getItem('usuario') || '{}')
    this.subscription = this._localstorage.getHeader().subscribe(message => {
      this.user = JSON.parse(localStorage.getItem('usuario') || '{}')
    });
  }

  getActiveHoursUser() {
    let cast = this.afs.collection("activeHours", ref => ref.where('status', '==', true).where('idUser', '==', this.user.id).orderBy('created_at', 'desc').limit(1)).snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)));
    return cast;
  }

  
  registerHourStart(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('usuario') || '{}')
      this.afs.collection("activeHours").add({
        created_at: new Date(),
        date_end: '',
        idUser: user.id,
        isDeleted: false,
        status: true,
        userName: user.name,
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }

  updateHourStatus(idPeticion: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('usuario') || '{}')
      const id = this.afs.createId();
      this.afs.collection("activeHours").doc(idPeticion).update({
        status: false,
        date_end:new Date()
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
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
