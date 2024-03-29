import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
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


  getDonationList() {
    let cast = this.afs.collection("donations", ref => ref.where('isDeleted', '==', false).orderBy('created_at','desc')).snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)));
    return cast;
  }

  getDonationListByUser(id:any) {
    let cast = this.afs.collection("donations", ref => ref.where('isDeleted', '==', false).where('idUser','==',id).orderBy('created_at','desc')).snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)));
    return cast;
  }

  getDonationUser() {
    let cast = this.afs.collection("donations", ref => ref.where('status', '==', true).where('idUser','==',this.user.id).orderBy('created_at','desc').limit(1)).snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)));
    return cast;
  }

  registerDonation(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const user = JSON.parse(localStorage.getItem('usuario') || '{}')
      this.afs.collection("donations").add({
        created_at: new Date(),
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
