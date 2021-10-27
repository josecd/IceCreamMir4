
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  numberObject: any;
  constructor(
  ) 
  {
    this.numberObject =[
      {
        id:1,
        name:1
      },
      {
        id:2,
        name:2
      },
      {
        id:3,
        name:3
      },
      {
        id:4,
        name:4
      },
      {
        id:5,
        name:5
      }
    ]
  }




}