import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HoursService } from 'src/app/services/hours.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-hours-active-list',
  templateUrl: './hours-active-list.component.html',
  styleUrls: ['./hours-active-list.component.scss']
})
export class HoursActiveListComponent implements OnInit {
  displayedColumns: string[] = ['user', 'created_at', 'date_end', 'status', 'accion']
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(
    private _hours: HoursService
  ) {
    this.getHours()
  }

  ngOnInit(): void {
  }


  getHours() {
    this._hours.getHours().subscribe(res => {
      res.map(async (element: any) => {
        if (element.created_at) {
          let data = element.created_at.toDate()
          element.created_at = new Date(data).toLocaleString()
        }
        if (element.date_end) {
          let data2 = element.date_end.toDate()
          element.date_end = new Date(data2).toLocaleString()
        }

        element.statusLabel = element.status == true ? 'Activo' : 'Terminado';

        // element.status = element.status == true?'Activo':'Desactivado';
      });
      let users: any
      users = res

      this.dataSource = new MatTableDataSource(users);

    })
  }

  goToUser(user: any) {

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
