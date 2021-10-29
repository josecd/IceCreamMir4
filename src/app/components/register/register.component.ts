import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiBasic } from 'src/app/services/api-basic';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public usuario: any;
  public pass: any;
  public discord: any;

  constructor(
    private router: Router,
    private _user: UsersService,
    private _app: ApiBasic
  ) { }

  ngOnInit(): void {
    // this._user.getCurrentUser().then(
    //   user => {     
    //     this.router.navigate(['/home']);
    //   },
    //   err => {
    //   }
    // );
  }

  register() {
    Swal.showLoading();

    this._user.getUserRegister(this.usuario).subscribe(res => {
      if (res.length == 0) {
        const body = {
          discord: this.discord,
          name: this.usuario,
          password: this.pass,
        }
        this._user.registerUser(body).then(res => {
          Swal.close()
          Swal.fire("Información guardada",)
          this.router.navigate(['/login']);
        })

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ya hay un usuario creado con este nombre',
        })
        // Swal.close()
      }


    })


  }

}
