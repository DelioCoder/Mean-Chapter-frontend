import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  hola: string = "hoal";

  miFormulario: FormGroup = this._fb.group({
    name    : [ , Validators.required ],
    email   : [ , [ Validators.required, Validators.email] ],
    password: [ , [ Validators.required, Validators.minLength(6) ] ]
  });

  constructor(
    private _fb         : FormBuilder,
    private _router     : Router,
    private _authService: AuthService,
  ) { }

  register() {
    const { name, email, password } = this.miFormulario.value;
    this._authService.register( name, email, password )
      .subscribe({
        next: ( ok ) => {
          if ( ok === true ) {
            this._router.navigateByUrl('/dashboard');
          } else {
            Swal.fire('Error', ok, 'error');
          }
        }
      })
  }

}
