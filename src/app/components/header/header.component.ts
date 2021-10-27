import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuList: any;
  constructor(
    private router: Router,
    private _localstorage: LocalstorageService,
    private _header: HeaderService
  ) {
    this.menuList = this._header.menuGeneral;
    
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
    this._localstorage.sendMessage('Message from Home Component to App Component!');

  }
}
