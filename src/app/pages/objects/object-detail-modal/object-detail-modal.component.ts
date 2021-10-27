import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalServiceService } from 'src/app/services/global-service.service';
import { ObjectService } from 'src/app/services/object.service';
import { PetitionsService } from 'src/app/services/petitions.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-object-detail-modal',
  templateUrl: './object-detail-modal.component.html',
  styleUrls: ['./object-detail-modal.component.scss']
})
export class ObjectDetailModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ObjectDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _global: GlobalServiceService,
    private _petition: PetitionsService,
    private _object: ObjectService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    Swal.showLoading();

    // this._object.updateObjectStatus(body, this.data.uid).then(res => {
    //   Swal.close()
    //   Swal.fire("Información guardada",)
    //   this.dialogRef.close();
    // })




  }

}
