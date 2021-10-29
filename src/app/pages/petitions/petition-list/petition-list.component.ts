import { GridOptions } from 'ag-grid-community';
import { PetitionsService } from 'src/app/services/petitions.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalDetailPetitionComponent } from '../modal-detail-petition/modal-detail-petition.component';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-petition-list',
  templateUrl: './petition-list.component.html',
  styleUrls: ['./petition-list.component.scss']
})
export class PetitionListComponent implements OnInit {
  displayedColumns: string[]
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  flagAdmin:boolean=false;
  ngOnInit() {

  }
  constructor(
    private _petition: PetitionsService,
    public datepipe: DatePipe,
    public dialog: MatDialog
  ) {
    let user = JSON.parse(localStorage.getItem('usuario') || '{}')
    if (user.rol == 'usuario') {
      this.flagAdmin = false;
      this.displayedColumns =['user', 'object', 'count', 'approve', 'cierre', 'Resolvio',]
    }else{
      this.flagAdmin = true;
      this.displayedColumns = ['user', 'object', 'count', 'approve', 'cierre', 'Resolvio', 'acciones',]
    }
    this._petition.getPetitionsListTest().subscribe(res => {

      res.map(async (element: any) => {
        let data = element.created_at.toDate()
        element.created_at = new Date(data).toLocaleString()

        if (element.dateAttended != "") {
          let dateAttended = element.dateAttended.toDate()
          element.dateAttended = new Date(dateAttended).toLocaleString()
        } else {
          element.dateAttended = '-----'
        }

        element.approve = element.nameAttended == '' ? 'En espera' : element.approve ? 'Aprobado' : 'Rechazado';
      });
      let users: any
      users = res
      this.dataSource = new MatTableDataSource(users);

    })
  }



  goToModalCheck(item: any) {
    this._petition.updatePetitionView(item.uid).then(res => {
      this.dialog.open(ModalDetailPetitionComponent, {
        width: "500px",
        data: item,
        disableClose: false,
      })
    })
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
