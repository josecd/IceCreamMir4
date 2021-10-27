import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalServiceService } from 'src/app/services/global-service.service';
import { PetitionsService } from 'src/app/services/petitions.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-create-petition',
  templateUrl: './modal-create-petition.component.html',
  styleUrls: ['./modal-create-petition.component.scss']
})
export class ModalCreatePetitionComponent implements OnInit {

  numberGlobal: any;
  selectNumber: any;
  objects: any;
  alerts: any;

  //Campos
  object: any = '';
  count: any = '';
  description: any = '';

  constructor(
    public dialogRef: MatDialogRef<ModalCreatePetitionComponent>,
    public _global: GlobalServiceService,
    private _petition: PetitionsService
  ) {
    this.numberGlobal = _global.numberObject;

  }

  ngOnInit(): void {
    this.getObjects();
    this.getAlerts();
  }

  getObjects() {
    this._petition.getPetitions().subscribe(res => {
      this.objects = res;
    })
  }

  getAlerts() {
    this._petition.getPetitionsAlerts().subscribe(res => {
      this.alerts = res;

    })
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    Swal.showLoading();

    if (!this.object || this.object == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes seleccionar un objeto ',
      })
      Swal.close()

    } else if (!this.count || this.count == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes seleccionar una cantidad',
      })
      Swal.close()

    } else if (!this.description || this.description == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes escribir una descripción breve',
      })
      Swal.close()

    } else {
      const user = JSON.parse(localStorage.getItem('usuario') || '{}')

      const body = {
        object: this.object,
        count: this.count,
        description: this.description
      }
      this._petition.registerPetition(body).then(res => {
        Swal.close()
        Swal.fire("Información guardada",)
        this.dialogRef.close();

      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al guardar los cambios',
        })
      })
    }
  }


}
