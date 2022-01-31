import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this._fb.group({
    email   : [ , [ Validators.required, Validators.email ] ],
    password: [ , [ Validators.required, Validators.minLength(6) ] ]
  });

  constructor(
    private _fb         : FormBuilder,
    private _router     : Router,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
      this.miFormulario.reset({
        email: 'test3@gmail.com',
        password: '123456'
      })
  }

  login() {

    this._authService.validarToken();

    const { email, password } = this.miFormulario.value;
    
    this._authService.login( email, password )
      .subscribe({
        next: ( ok ) => {
          // console.log(ok);
          if ( ok === true ) {
            this._router.navigateByUrl('/dashboard');
          } else {
            Swal.fire('Error', ok, 'error');
          }

        }
      });

  }

}
