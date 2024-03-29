import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DonationsService } from 'src/app/services/donations.service';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss']
})
export class DonationListComponent implements OnInit {
  displayedColumns: string[] = ['user', 'created_at', 'accion']
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private _donation: DonationsService,
    private router: Router
  ) {
    this.getDonationList()
  }

  ngOnInit(): void {
  }

  getDonationList() {
    this._donation.getDonationList().subscribe(res => {
      res.map(async (element: any) => {
        let data = element.created_at.toDate()
        element.created_at = new Date(data).toLocaleString()
      });
      let users: any
      users = res
      this.dataSource = new MatTableDataSource(users);
    })
  }

  goUserProfile(item: any) {
    this.router.navigate(['/user',item.idUser]);

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
