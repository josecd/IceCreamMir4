import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { PetitionListObjectsComponent } from '../../petitions/petition-list-objects/petition-list-objects.component';

@Component({
  selector: 'app-user-tabs',
  templateUrl: './user-tabs.component.html',
  styleUrls: ['./user-tabs.component.scss']
})
export class UserTabsComponent implements OnInit {
  @ViewChild("imagesComponent") PetitionListObjectsComponent: PetitionListObjectsComponent | undefined;

  idUser:any;
  userData:any;
  constructor(
    private route: ActivatedRoute,
    private _user:UsersService
  ) { 
    this.idUser = this.route.snapshot.paramMap.get("id");
    this.getUSerSelect()
  }

  getUSerSelect(){
    this._user.getUserByID(this.idUser).subscribe(res=>{
      this.userData = res;
    })
  }

  ngOnInit(): void {
  }

}
