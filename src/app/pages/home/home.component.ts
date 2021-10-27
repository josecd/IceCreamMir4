import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ModalCreatePetitionComponent } from '../petitions/modal-create-petition/modal-create-petition.component';
import { PetitionsService } from 'src/app/services/petitions.service';
import { ObjectCreateModalComponent } from '../objects/object-create-modal/object-create-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('usuario') || '{}')
  constructor(
    public dialog: MatDialog,
    private _petition:PetitionsService
  ) { }

  ngOnInit(): void {
  }

  goToPetition() {
    this.dialog.open(ModalCreatePetitionComponent, {
      width: "500px"
    })
  }

  goToObject() {
    this.dialog.open(ObjectCreateModalComponent, {
      width: "500px"
    })
  }
  rolActive(){
  
  }

}
