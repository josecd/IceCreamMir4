import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ObjectService } from 'src/app/services/object.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['user', 'object', 'created_at', 'estatus','estatusLabel', 'accion']
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private _object: ObjectService,
    public dialog: MatDialog,
    private _user: UsersService,
    private router: Router
  ) {
    this.getUSer()
   }

  ngOnInit(): void {
    this.getUSer()

  }


  getUSer() {
    this._user.getUsers().subscribe(res => {
      res.map(async (element: any) => {
        let data = element.created_at.toDate()
        element.created_at = new Date(data).toLocaleString()
        element.approveLabel = element.approve == true?'Activado':'Desactivado';
        element.approve = element.approve == true?'Desactivar usuario':'Activar usuario';

        // element.status = element.status == true?'Activo':'Desactivado';
      });
      let users: any
      users = res
      
      this.dataSource = new MatTableDataSource(users);
      
    })
  }

  goUserProfile(item: any) {
    this.router.navigate(['/user',item.uid]);
  }

  goToModalCheck(item: any) {
    Swal.showLoading();
    const status = item.approve == 'Desactivar usuario' ? false : true;
    this._user.updateUserApprove(status, item.uid).then(res => {
      Swal.close()
      Swal.fire("Información guardada",)
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
