import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ApiBasic } from 'src/app/services/api-basic';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = this.formBuilder.group(
    {
      contrasenia: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ])
      ),
      correo: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
        ])
      ),
    },
  );
  errorMessage: string = '';
  error_messages = {
    correo: [
      { type: 'required', message: 'El correo es necesario' },
      { type: 'minLength', mesaage: 'El correo no cumple con los caracteres' },
      { type: 'maxLength', message: 'El correo tiene muchos caracteres' },
      { type: 'pattern', message: 'Ingresa un usuario valido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es necesaria' },
      { type: 'minLength', mesaage: 'Escriba una contraseña más larga' },
      { type: 'maxLength', message: 'La contraseña a pasado el limite de los caracteres' },
      { type: 'pattern', message: 'Ingresa una contraseña valida, (Un numero, una mayuscula y una miniscula)' }
    ],
  };

  constructor(
    private router: Router,
    private _user: UsersService,
    public formBuilder: FormBuilder,
    private _app: ApiBasic,
    private _localstorage:LocalstorageService
  ) { }

  ngOnInit(): void {
    this.LoginForm();
    this._user.getCurrentUser().then(
      user => {
        this.router.navigate(['/home']);
      },
      err => {

      }
    );
  }

  goLogin(value: any) {
    this._user.getUser(value).subscribe(res => {
      if (res.length != 0) {
        this._app.user = res[0]
        const localStouser = {
          name: this._app.user.name,
          id: this._app.user.uid,
          rol: this._app.user.rol,
          discord: this._app.user
        }
        localStorage.setItem('usuario', JSON.stringify(localStouser));
        this.router.navigate(['/home']);
        this._localstorage.sendMessage('Message from Home Component to App Component!');
        this._localstorage.sendHeader('Message from Home Component to App Component!');

      } else {

      }
    })
  }

  LoginForm() {
    this.loginForm = this.formBuilder.group(
      {
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30),
          ])
        ),
        usuario: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
          ])
        ),
      },
    );
  }

}
