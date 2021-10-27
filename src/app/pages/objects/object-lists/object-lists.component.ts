import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ObjectService } from 'src/app/services/object.service';
import { ObjectDetailModalComponent } from '../object-detail-modal/object-detail-modal.component';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-object-lists',
  templateUrl: './object-lists.component.html',
  styleUrls: ['./object-lists.component.scss']
})
export class ObjectListsComponent implements OnInit {
  displayedColumns: string[] =['user', 'object', 'created_at',  'estatus','accion']
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  flagAdmin: boolean = false;

  constructor(
    private _object: ObjectService,
    public dialog: MatDialog
  ) {
    this._object.getObjectsListTest().subscribe(res => {

      res.map(async (element: any) => {
        let data = element.created_at.toDate()
        element.created_at = new Date(data).toLocaleString()
        element.statusBoton = element.status == true?'Desactivar objeto':'Activar objeto';

        element.status = element.status == true?'Activo':'Desactivado';
      });
      let users: any
      users = res
      this.dataSource = new MatTableDataSource(users);

    })

  }

  ngOnInit(): void {
  }

  goToModalCheck(item: any) {
    
    Swal.showLoading();
    const status = item.status =='Activo'?false:true;
    
    this._object.updateObjectStatus(status, item.uid).then(res => {
      Swal.close()
      Swal.fire("Información guardada",)
    })

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
