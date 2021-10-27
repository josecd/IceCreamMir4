import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalServiceService } from 'src/app/services/global-service.service';
import { PetitionsService } from 'src/app/services/petitions.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-detail-petition',
  templateUrl: './modal-detail-petition.component.html',
  styleUrls: ['./modal-detail-petition.component.scss']
})
export class ModalDetailPetitionComponent implements OnInit {
  object: any = '';
  count: any = '';
  description: any = '';

  estatus: any;
  constructor(

    public dialogRef: MatDialogRef<ModalDetailPetitionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _global: GlobalServiceService,
    private _petition: PetitionsService
  ) {

  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    Swal.showLoading();

    if (this.estatus == "Rechazar" && this.description == '') {
      Swal.close()
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes poner una descripción ',
      })

    } else {
      const approves = this.estatus == "Rechazar" ? false : true;
      this.description = this.estatus == "Aprobar" ? '' : this.description;
      const body = {
        approve: approves,
        description: this.description
      }
      this._petition.updatePetitionClose(body, this.data.uid).then(res => {
        Swal.close()
        Swal.fire("Información guardada",)
        this.dialogRef.close();
      })

    }


  }

}
