import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HoursService {
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

  getHours() {
    let body = this.afs.collection("activeHours",ref=>ref.orderBy('created_at','desc')) .snapshotChanges()
    .pipe(map(actions => actions.map(this.documentToDomainObject)));
    return body;
  }

  getHoursUser(id:any) {
    let body = this.afs.collection("activeHours",ref=>ref.orderBy('created_at','desc').where('idUser','==',id)) .snapshotChanges()
    .pipe(map(actions => actions.map(this.documentToDomainObject)));
    return body;
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
