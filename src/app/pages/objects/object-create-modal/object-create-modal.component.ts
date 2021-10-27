import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalServiceService } from 'src/app/services/global-service.service';
import { ObjectService } from 'src/app/services/object.service';
import { PetitionsService } from 'src/app/services/petitions.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-object-create-modal',
  templateUrl: './object-create-modal.component.html',
  styleUrls: ['./object-create-modal.component.scss']
})
export class ObjectCreateModalComponent implements OnInit {
  name:any
  constructor(
    public dialogRef: MatDialogRef<ObjectCreateModalComponent>,
    public _global: GlobalServiceService,
    private _petition: PetitionsService,
    private _object:ObjectService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    Swal.showLoading();

    
      this._object.registerObjects(this.name).then(res => {
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
