import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DonationsService } from 'src/app/services/donations.service';

@Component({
  selector: 'app-conation-list-user',
  templateUrl: './conation-list-user.component.html',
  styleUrls: ['./conation-list-user.component.scss']
})
export class ConationListUserComponent implements OnInit {
  displayedColumns: string[] = ['user', 'created_at']
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @Input('idUsers') idUserTab: any;


  constructor(
    private _donation:DonationsService
  ) { }

  ngOnInit(): void {
    this.getDonationList()
  }

  getDonationList() {
    this._donation.getDonationListByUser(this.idUserTab).subscribe(res => {
      res.map(async (element: any) => {
        let data = element.created_at.toDate()
        element.created_at = new Date(data).toLocaleString()
      });
      let users: any
      users = res
      this.dataSource = new MatTableDataSource(users);
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
